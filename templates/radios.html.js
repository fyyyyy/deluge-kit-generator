var RADIOS_TEMPLATE = (`
<div class="form-group schema-form-radios {{form.htmlClass}}" ng-class="{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess()}">
    <label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label>
    <div class="radio" ng-repeat="item in form.titleMap">
        <label title="{{form.description}}">
            <span ng-if="item.value === $$value$$" class="glyphicon glyphicon-ok"></span>
            <span ng-else class="glyphicon not glyphicon-stop"></span>
            <input type="radio" class="{{form.fieldHtmlClass}}" sf-changed="form" ng-disabled="form.readonly" ng-model="$$value$$"
                ng-model-options="form.ngModelOptions" schema-validate="form" ng-value="item.value" name="{{form.key.join('.')}}">
            <span ng-bind-html="item.name.toUpperCase()"></span>
        </label>
    </div>
    <div class="help-block" sf-message="form.description"></div>
</div>
`)