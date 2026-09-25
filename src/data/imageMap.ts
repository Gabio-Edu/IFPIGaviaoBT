const imageMap = {
  "categoria-comidas": require("../../assets/images/menu/categoria-comidas.png"),
  "categoria-bebidas": require("../../assets/images/menu/categoria-bebidas.png"),

  "pastel-de-carne": require("../../assets/images/menu/pastel-de-carne.png"),
  "coxinha-de-frango": require("../../assets/images/menu/coxinha-de-frango.png"),
  "cuscuz-com-ovo": require("../../assets/images/menu/cuscuz-com-ovo.png"),
  "arrumadinho-completo": require("../../assets/images/menu/arrumadinho-completo.png"),

  "suco-de-laranja": require("../../assets/images/menu/suco-de-laranja.png"),
  "refrigerante": require("../../assets/images/menu/refrigerante.png"),
  "cafe-expresso": require("../../assets/images/menu/cafe-expresso.png"),
  "suco-acerola": require("../../assets/images/menu/suco-acerola.png"),

  "arrumadinho-completo-large": require(
    "../../assets/images/menu/arrumadinho-completo-large.png"
  ),
};

export function getImageSource(nomeImagem: string) {
  return imageMap[nomeImagem as keyof typeof imageMap];
}