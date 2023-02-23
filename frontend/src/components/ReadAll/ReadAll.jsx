import "./ReadAll.css";
import Card from "../Card/Card";

const items = [
  {
  _id: '1234',
  nome: 'Rick Sanchez',
  imagemUrl: 'https://i.pinimg.com/originals/6e/51/32/6e5132a90812ad1abf3711135a5cf406.png',
  tags: ["Status: Vivo", "Espécie: Humana", "Origem: Terra C-137"],
},
{
  _id: '5678',
  nome: 'Morty Smith',
  imagemUrl: 'https://w7.pngwing.com/pngs/874/965/png-transparent-morty-smith-rick-sanchez-squanchy-adult-swim-homo-sapiens-others-child-face-hand.png'
},
{
  _id: '91011',
  nome: 'Beth Smith',
  imagemUrl: 'https://static.wikia.nocookie.net/ipdkverse/images/c/cb/Beth_Smith_1.png'
}
]


function ReadAll(){
  return (
    <div className="ReadAll">
      {items.map(function (item) {
        // console.log(item);
        // Key -> card-1234
        return <Card key={"card-" + item._id} item={item} />;
      })}
    </div>
  );
}

export default ReadAll;