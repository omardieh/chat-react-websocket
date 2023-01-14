export const handleInputChange = (event, key, setValue) => {
  setValue((prev) => ({ ...prev, [key]: event.target.value }));
};
