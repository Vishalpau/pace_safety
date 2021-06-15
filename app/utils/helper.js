export const setToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => localStorage.removeItem("token");

export const apiUrl = "https://feature1-hseapi.paceos.io/";
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatPlanNames = (name, delimiter, join) => {
  const splitName = name.split(delimiter);
  const formattedName = [];
  splitName.forEach((word) => {
    formattedName.push(capitalize(word));
  });
  return formattedName.join(join);
};

export const currancyFormatter = (number) => {
  return parseFloat(number)
    .toFixed(1)
    .replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")
    .replace(/\.0+$/, "");
};

export const maxLengthCheck = (e) => {
  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }
};
export const formatNames = (names) => {
  const f = names.split(" ");
  for (let i = 0; i < f.length; i += 1) {
    f[i] = f[i].charAt(0).toUpperCase() + f[i].slice(1);
  }

  return f.join(" ");
};