/**
 * Created by stefania on 6/12/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { WSJobStatus } from "../domain/ws-job-status";

@Injectable()
export class WorkflowService {

    private endpoint = process.env.WORKFLOW_API_ENDPOINT;

    constructor (private http: Http) {
        console.log(this.endpoint);
    }

    private _workflowServiceUrl = this.endpoint + '/';

    executeJob(corpusId: string, workflowId: string) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let params = new URLSearchParams();
        // params.append('corpusId','60446e38-ab69-4440-8d8f-a5c744c7d6d2');
        params.append('workflowId','DGTest1');
        params.append('corpusId', corpusId);
        // params.append('workflowId', workflowId);

        return this.http.post(this._workflowServiceUrl + 'executeJob?' + params.toString(), {}, options)
            .map(res => <string> res.text())
            .catch(this.handleError);
    }

    getStatus(jobID: string) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let params = new URLSearchParams();
        params.append('jobID',jobID);

        return this.http.post(this._workflowServiceUrl + 'getStatus?' + params.toString(), {}, options)
            .map(res => <WSJobStatus> res.json())
            .catch(this.handleError);

    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = "";
        console.log(error);
        if (error instanceof Response) {
            const body = error.text() || '';
            //const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
        } else {
            errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
        }
        return Observable.throw(errMsg);
    }
}