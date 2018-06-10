var SELECT_TEMPLATE = (`
<div class="form-group {{form.htmlClass}} schema-form-select" ng-class=
    "{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false}">
    <label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label>
    <select ng-model="$$value$$" ng-model-options="form.ngModelOptions" ng-disabled=
        "form.readonly" sf-changed="form" class="form-control {{form.fieldHtmlClass}}" schema-validate="form" ng-options=
        "item.value as item.name group by item.group for item in form.titleMap" name="{{form.key.slice(-1)[0]}}"></select>
    <div class="help-block" sf-message="form.description"></div>
</div>
`)