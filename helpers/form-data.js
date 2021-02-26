const getFormDataFromObject=e=>{const o=new FormData;for(const[t,n]of Object.entries(e))if(Array.isArray(n))n.forEach(e=>{o.append(`${t}[]`,e)});else if("object"!=typeof n||n instanceof Blob||n instanceof File)o.append(t,n);else for(const[e,r]of Object.entries(n))o.append(`${t}[${e}]`,r);return o};

export {
  getFormDataFromObject,
}
