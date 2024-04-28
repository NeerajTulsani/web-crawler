import * as rules from 'vee-validate/dist/rules';
import { required, email, integer, alpha_num, numeric, min_value, confirmed } from 'vee-validate/dist/rules';
import { extend, localize, ValidationProvider, ValidationObserver, } from 'vee-validate';

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// localize('en', en);

// Customize required rules
extend('required', {
  ...required,
  // TODO: add localized messages here - app.$t("models.tabs.partners")
  message: 'This field is required'
});
// Customize alpha_num rules
extend('integer', {
  ...integer,
  // TODO: add localized messages here - app.$t("models.tabs.partners")
  message: 'This field must be an integer'
});
// Customize alpha_num rules
extend('alpha_num', {
  ...alpha_num,
  // TODO: add localized messages here - app.$t("models.tabs.partners")
  message: 'This field may only contain alpha-numeric characters'
});

extend('min', {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ['length'],
  message: 'This field must be atleast {length} characters'
});

// Customized validation for non-English words
extend('isEnglish' , value => {
    let nonEnglishWords = ''
    for(let i=0;i<value.length;i++){
      if(value.charCodeAt(i)>128)nonEnglishWords = nonEnglishWords + value[i]
    }
  if(nonEnglishWords.length <= 0) return true
  return `Not supported characters : ${nonEnglishWords}`
});

//Numeric value 
extend('numeric', {
  ...numeric,
  message: 'This field must contain only numerics'
});

extend('url', {
  validate: value => /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/ig.test(value.trim()),
  message: "This field must contain url only"
});

export {
  ValidationObserver as FormValidator,
  ValidationProvider as InputValidator
}
