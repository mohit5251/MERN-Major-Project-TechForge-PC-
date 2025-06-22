import { useNavigate } from "react-router-dom";

const cards = [
  {
    name: "RTX 5070",
    description:
      "Experience dynamic visuals and efficient performance with the RTX 5070. Designed for gamers and creators, it delivers smooth rendering and vibrant graphics for all your tasks.",
    button: "BUY RTX 5070",
    image: "https://res.cloudinary.com/dokpeunu6/image/upload/v1749119252/5070_1_tsesqc.webp", // Replace with real URLs
  },
  {
    name: "RTX 5070 TI",
    description:
      "Boost your system with the RTX 5070 Ti. With enhanced speed and superior design, it elevates gaming and creative workflows, ensuring precision and high-quality performance.",
    button: "BUY RTX 5070TI",
    image: "https://res.cloudinary.com/dokpeunu6/image/upload/v1749119323/5070ti_1_ejgulv.webp",
  },
  {
    name: "RTX 5080",
    description:
      "Push the limits with the RTX 5080. Engineered for high-resolution gaming and intricate design work, it offers cutting-edge technology for unparalleled visual experiences.",
    button: "BUY RTX 5080",
    image: "https://res.cloudinary.com/dokpeunu6/image/upload/v1749119356/5080_1_ly5rtr.webp",
  },
  {
    name: "RTX 5090",
    description:
      "Unleash uncompromising power with the RTX 5090. This flagship GPU is built for the most demanding tasks, offering exceptional performance for both immersive gaming and creative production.",
    button: "BUY RTX 5090",
    image: "https://res.cloudinary.com/dokpeunu6/image/upload/v1749119398/5090_1_bh35cz.webp",
  },
];
export const GraphicsCards = () => {

  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/products/GPU?name=${name}`)
  }

    return(
        <div className="graphics-card-section ">
      {cards.map((card, index) => (
        <div className="graphics-card" key={index}>
          <div className="graphics-card-image">
            <img src={card.image} alt={card.name} />
          </div>
          <div className="graphics-card-body">
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            <button onClick={() => handleClick(card.name)}>{card.button}</button>
          </div>
        </div>
      ))}
    </div>
    )
}