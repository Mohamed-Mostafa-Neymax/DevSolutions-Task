import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Issue {
    project: string;
    issueType: string;
    reporter: string;
    assignee: string | null;
    summary: string;
}

export interface Phase {
    title: string;
    id: string;
    issues: Issue[];
}

@Injectable({ providedIn: 'root' })
export class BoardService {
    issuePhases: Phase[] = [
        {
            title: 'TO DO',
            id: 'todoList',
            issues: []
        },
        {
            title: 'IN PROGRESS',
            id: 'progressList',
            issues: []
        },
        {
            title: 'IN REVIEW',
            id: 'reviewList',
            issues: []
        },
        {
            title: 'DONE',
            id: 'doneList',
            issues: []
        }
    ];
    filteredIssues!: Phase[];

    issuesSubject = new BehaviorSubject<Phase[]>(this.issuePhases);
    filterSubject = new BehaviorSubject<Phase[]>(this.issuePhases);

    // I will be thankful if you fix its bug and let me know what's wrong.
    // Here I'm trying to update the phases.
    // Unlock the comments related to this method to see the logs in (Board Component) Drap method.
    updatePhasesOnDrag(twoColumns: {prevID: string; prevColumn: Issue[]; id: string; column: Issue[]}) {
        const phases = localStorage.getItem('issuePhases');
        const currentPhases = JSON.parse(phases ? phases : '');
        const phasesAfterDrag = currentPhases.map((phase: Phase) => 
            phase.id === twoColumns.prevID ? {...phase, issues: twoColumns.prevColumn} : 
            phase.id === twoColumns.id ? {...phase, issues: twoColumns.column} :
            phase
        );
        localStorage.setItem('issuePhases', JSON.stringify(phasesAfterDrag));
        this.issuesSubject.next(phasesAfterDrag);
    }

    updatePhasesOnCRUD() {
        localStorage.setItem('issuePhases', JSON.stringify(this.issuePhases));
        const phases = localStorage.getItem('issuePhases');
        const updatedPhases = JSON.parse(phases ? phases : '');
        this.issuesSubject.next(updatedPhases);
        // this.issuesSubject.next(this.issuePhases);
    }

    createIssue(issueData: Issue) {
        const phases = localStorage.getItem('issuePhases');
        if( phases ) {
            const updatedPhases = JSON.parse(phases ? phases : '');
            this.issuePhases = updatedPhases;
        }
        this.issuePhases[0].issues.unshift(issueData);
        this.updatePhasesOnCRUD();
    }

    editIssue(phaseIndex: number = 0, issueIndex: number = 0, newIssueData: Issue) {
        const phases = localStorage.getItem('issuePhases');
        if( phases ) {
            const updatedPhases = JSON.parse(phases ? phases : '');
            this.issuePhases = updatedPhases;
        }
        this.issuePhases[phaseIndex].issues[issueIndex] = newIssueData;
        this.updatePhasesOnCRUD();
    }

    deleteIssue(phaseIndex: number = 0, issueIndex: number = 0) {
        const phases = localStorage.getItem('issuePhases');
        if( phases ) {
            const updatedPhases = JSON.parse(phases ? phases : '');
            this.issuePhases = updatedPhases;
        }
        this.issuePhases[phaseIndex].issues.splice(issueIndex, 1);
        this.updatePhasesOnCRUD();
    }

    getFilteredIssues(textSearch: string) {
        const phases = localStorage.getItem('issuePhases');
        if( phases ) {
            const updatedPhases = JSON.parse(phases ? phases : '');
            this.issuePhases = updatedPhases;
        }
        this.filteredIssues = structuredClone(this.issuePhases);
        if( textSearch.length > 0 ) 
            this.filteredIssues.forEach((phase, index) => 
                this.filteredIssues[index].issues = phase.issues.filter(
                    issue => issue.summary.toLowerCase().includes(textSearch.toLowerCase())
                )
            );
        else this.filteredIssues = structuredClone(this.issuePhases);
        this.filterSubject.next(this.filteredIssues);
    }
}