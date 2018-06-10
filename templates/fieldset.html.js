var FIELDSET_TEMPLATE = (`
<fieldset ng-disabled="form.readonly" class="schema-form-fieldset {{form.htmlClass}}">
    <legend ng-class="{'btn btn-info' : ['osc1', 'osc2', 'defaultParams', 'patchCables'].includes(form.title), 'btn-warning' : toggle }" ng-show="form.title" ng-click="toggle = !toggle">{{ form.title }}</legend>
    <div class="help-block" ng-show="form.description" ng-bind-html="form.description"></div>
    <sf-decorator ng-repeat="item in form.items" form="item" ng-if="(!['osc1', 'osc2', 'defaultParams', 'patchCables'].includes(form.title)) || toggle"></sf-decorator>
</fieldset>
`)