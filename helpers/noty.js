const showMultipleErrors = ({errors, message}) => {
  const msg_text = !!message ? message : 'При заполнении формы допущены ошибки';
  let msg_html = `${msg_text}<br/><br/>`;

  if (typeof errors === 'string') {
    msg_html = `${msg_html}${errors}`;
  } else {
    //todo: сериализация массивов по умолчанию - не очень
    msg_html = Object.values(errors)
      .reduce((accumulator, errors_arr) => `${accumulator}${errors_arr}<br/>`, msg_html);
  }
  this.$noty.error(msg_html)
}

export {
  showMultipleErrors,
}
