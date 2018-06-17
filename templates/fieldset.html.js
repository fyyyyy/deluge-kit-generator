var FIELDSET_TEMPLATE = (`
<fieldset ng-disabled="form.readonly" class="schema-form-fieldset {{form.htmlClass}}">

    <div ng-if="['osc1', 'osc2', 'defaultParams', 'patchCables'].includes(form.title)">
        <legend class="toggle btn-info" ng-class="{'btn-warning' : toggle }" ng-show="form.title" ng-click="toggle = !toggle">
            {{ form.title }}
            <i ng-if="!toggle" class="glyphicon glyphicon-chevron-right"></i>
            <i ng-if="toggle" class="glyphicon glyphicon-chevron-down"></i>
        </legend>
        <div class="help-block" ng-show="form.description" ng-bind-html="form.description"></div>
        <sf-decorator ng-repeat="item in form.items" form="item" ng-if="toggle"></sf-decorator>
    </div>

    <div ng-if="!['osc1', 'osc2', 'defaultParams', 'patchCables'].includes(form.title)">
        <legend ng-show="form.title" >
            {{ form.title }}
        </legend>
        <div class="help-block" ng-show="form.description" ng-bind-html="form.description"></div>
        <sf-decorator ng-repeat="item in form.items" form="item"></sf-decorator>
    </div>

</fieldset>
`)