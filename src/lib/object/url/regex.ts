const regex = (/^(?<scheme>\p{L}[-+.\p{L}\d]+):\/\/(?<host>(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))*(?::\d+)?))(?<path>(?:\/(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))|[:@])*)*)(?<query>\?(?:(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))|[:@])|[/?])*)?(?<fragment>#(?:(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))|[:@])|[/?])*)?$/u);

export default regex;
