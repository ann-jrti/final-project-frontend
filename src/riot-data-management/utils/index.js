export const getChampSplash = async (champ) => {
    const response = await fetch(`https://ddragon.canisback.com/img/champion/splash/${champ}.jpg`)
    console.log(response);
    const image = await response.blob()
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
        const base64data = reader.result;
        console.log(base64data);
    }
}