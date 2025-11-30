export const replacePlaceholder = (template, data) => {
  let newTemplate = template;
  for (const key in data) {
    newTemplate = newTemplate.replace(`{{${key}}}`, data[key]);
  }
  return newTemplate;
};
