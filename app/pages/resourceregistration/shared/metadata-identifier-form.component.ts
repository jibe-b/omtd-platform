/**
 * Created by stefanos on 22/11/2016.
 */

import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Description, metadataIdentifierTypeDesc} from "./omtd.description";
import {EnumValues, metadataIdentifierSchemeNameEnum} from "./omtd.enum"

@Component({
    selector: 'metadata-identifier-form',
    templateUrl : 'app/pages/resourceregistration/shared/templates/metadata-identifier-form.component.html',
    styleUrls : ['app/pages/resourceregistration/shared/templates/common.css']
})


export class MetadataIdentifierFormControl implements OnInit{

    metadataIdentifierDesc : Description;
    schemeUriDesc : Description;
    metadataIdentifierSchemeDesc : Description;
    metadataIdentifierValues : EnumValues[];

    @Input('group')
    public parentForm: FormGroup;

    public get formGroup() {
        return this.parentForm;
    }

    public set formGroup(val : FormGroup) {
        this.parentForm = val;
    }

    constructor(private _fb: FormBuilder) {
        this.metadataIdentifierDesc = metadataIdentifierTypeDesc;
        this.metadataIdentifierDesc.label = "Identifier";
        this.schemeUriDesc = {desc : "Any URI", label : "URI"};
        this.metadataIdentifierSchemeDesc = {desc : "Enum" , label : "One of the options"};
        this.metadataIdentifierValues = metadataIdentifierSchemeNameEnum;
    }

    ngOnInit() {
    }
}