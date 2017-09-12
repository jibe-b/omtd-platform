/**
 * Created by stefania on 9/12/17.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import {
    Component as OMTDComponent, IdentificationInfo, ResourceIdentifier,
    ResourceIdentifierSchemeNameEnum
} from "../../../domain/openminted-model";
import { ResourceService } from "../../../services/resource.service";

@Component({
    selector: 'component-update-using-form',
    templateUrl: './component-update-using-form.component.html'
})

export class ComponentUpdateUsingFormComponent implements OnInit {

    componentForm: FormGroup;
    componentValue : OMTDComponent;
    componentFormErrorMessage: string = null;

    private production = process.env.PRODUCTION;

    errorMessage: string = null;
    successfulMessage: string = null;

    constructor(private resourceService: ResourceService) {
    }

    ngOnInit() {

    }

    handleComponent(component : any) {
        this.componentForm = component;
    }

    onSubmit() {

        this.successfulMessage = null;
        this.errorMessage = null;

        if(this.componentForm.valid)
            this.componentFormErrorMessage = null;
        else
            this.componentFormErrorMessage = 'There are invalid or missing fields in the metadata you have submitted. You ' +
                'can see the ones invalid or missing marked as red.';

        if(this.componentForm.valid) {
            let component : OMTDComponent = Object.assign({},this.componentForm.value);
            let resourceIdentifier : ResourceIdentifier = new ResourceIdentifier();
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 40; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            resourceIdentifier.resourceIdentifierSchemeName = ResourceIdentifierSchemeNameEnum.OTHER;
            resourceIdentifier.value = text;
            component.componentInfo.identificationInfo.resourceIdentifiers = [resourceIdentifier];
            this.resourceService.uploadComponent(this.componentForm.value).subscribe(
                res => {
                    this.successfulMessage = 'Component registered successfully';
                    window.scrollTo(0,0);
                }, error => this.handleError('Component registration failed', error)
            );
        } else {
            window.scrollTo(0,0);
        }
    }

    handleError(message: string, error) {
        this.errorMessage = message + ' (Server responded: ' + error + ')';
        window.scrollTo(0,0);
    }
}