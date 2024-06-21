export const imageWebp = (img:string) => {


	const param = "&fm=webp";
	const imgWp = img + param;

  console.log(imgWp);

	return imgWp;
};
