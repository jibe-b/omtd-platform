/**
 * Created by stefania on 1/20/17.
 */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { URLParameter } from "../../../domain/url-parameter";
import { PublicationSearchResults } from "../../../domain/publications-search-results";
import { ContentConnectorService } from "../../../services/content-connector.service";
import { Facet } from "../../../domain/facet";
import { SearchQuery } from "../../../domain/search-query";
import {OMTDCorpus} from "../../../domain/openminted-model";
import { Observable } from 'rxjs/Rx';
import {ResourceService} from "../../../services/resource.service";

@Component({
    selector: 'corpus-builder',
    templateUrl: 'app/pages/resourceregistration/corpus/corpus-builder.component.html',
    styleUrls : ['app/pages/resourceregistration/shared/templates/common.css']
})

export class CorpusBuilderComponent {

    private errorMessage: string;
    private sub: Subscription;

    private urlParameters: URLParameter[] = [];

    private gettingCorpusMetadata:boolean = true;
    private buildingCorpus:boolean = true;

    private corpus: OMTDCorpus;
    
    private corpusPromise : Observable<OMTDCorpus>;

    constructor(fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
                private contentConnectorService: ContentConnectorService) {

    }

    ngOnInit() {

        this.sub = this.activatedRoute
            .params
            .subscribe(params => {

                this.gettingCorpusMetadata = true;

                this.urlParameters.splice(0,this.urlParameters.length);

                // this.foundResults = true;
                //
                // this.publicationSources = null;

                for (var obj in params) {
                    if (params.hasOwnProperty(obj)) {
                        var urlParameter: URLParameter = {
                            key: obj,
                            values: params[obj].split(',')
                        };
                        this.urlParameters.push(urlParameter);
                    }
                }
                
                //request corpus metadata from the content connector
                // this.contentConnectorService.prepareCorpus(this.urlParameters).subscribe(
                //     corpus => this.loadCorpusMetadata(corpus),
                //     error => this.handleError(<any>error));

                this.corpusPromise = this.contentConnectorService.prepareCorpus(this.urlParameters);
                this.corpusPromise.subscribe(
                    corpus => this.loadCorpusMetadata(corpus),
                    error => this.handleError(<any>error));
            });
    }

    loadCorpusMetadata(corpus: OMTDCorpus) {
        this.gettingCorpusMetadata = false;
        console.log('Corpus returned from connector: ', corpus);
    }
}