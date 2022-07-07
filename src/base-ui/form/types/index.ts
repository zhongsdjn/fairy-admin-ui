type IFormType = "input" | "password" | "select" | "datepicker";

// field作为外界传值时绑定到特定组件元素的标识符 如在form中使用v-model=绑定  v-model="formData[`${item.field}`]"
export interface IFormItem {
  field: string; //
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string
  //   针对select
  options?: any[];
  //   其它特殊的属性
  otherOption?: any;
  isHidden?: boolean;
}

export interface IForm {
  title?: string

  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemLayout?: any;
  itemStyle?: any;
}
