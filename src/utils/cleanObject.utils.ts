const cleanObject = async (obj: any) => {
  let cleanedObject: any = {};

  for (const key in obj) {
    if (obj[key] || typeof obj[key] === 'boolean') {
      cleanedObject[key] = obj[key];
    }
  }
  return cleanedObject;
};

export default cleanObject;
