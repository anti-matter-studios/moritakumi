/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */


import { PresentationLayout } from "../components/PresentationLayout/PresentationLayout";
import { Slide, SlideCard, SlideHeader } from "../components/Slide";
import TextReplacement from "../components/TextReplacement";
import BackgroundImage from "../components/BackgroundImage";
import { Timeline } from "../components/Timeline";


export default function WhoAmIPage() {
    return <PresentationLayout timeline={<Timeline>
        <Timeline.Item id="who-am-i">Qui je suis</Timeline.Item>
        <Timeline.Item id="how-am-i">Ma façon d'être</Timeline.Item>
        <Timeline.Item id="citation">Ma citation</Timeline.Item>
        <Timeline.Item id="song">Ma chanson</Timeline.Item>
        <Timeline.Item id="movie">Mon film</Timeline.Item>
        <Timeline.Item id="colour">Ma couleur</Timeline.Item>
        <Timeline.Item id="place">Mon endroit</Timeline.Item>
    </Timeline>}>
        <Slide id="who-am-i" navLabel="Qui suis-je?">
            <SlideHeader>Qui je suis</SlideHeader>
            <p>
                Je m’appelle Michèle Caillaud, j’ai 24 ans, je vis à Strasbourg et je suis franco-allemande.
                Je suis quelqu’un d’extraverti, de solaire et de profondément tourné vers les autres.
            </p>
            <p>
                J’aime les échanges simples, les discussions spontanées, les personnes vraies.
                Dans la vie comme au travail, j’ai besoin de contact humain.
                Je préfère largement aller voir quelqu’un directement plutôt que d’envoyer trois mails pour dire la même
                chose.
            </p>
        </Slide>
        <Slide id="how-am-i" navLabel="Ma façon d’être">
            <SlideHeader>Ma façon d’être</SlideHeader>
            <p>
                Je suis empathique, dynamique et positive.
                J’ai tendance à toujours chercher ce qu’il peut y avoir de bien, même dans les situations compliquées.
                Ce n’est pas de la naïveté, c’est plutôt ma manière d’avancer.
            </p>
            <p>
                Je suis aussi perfectionniste. Parfois un peu trop.
                Le genre de personne qui aime badger à des heures pile, parce que 8h00 c’est quand même plus
                satisfaisant que 8h01.
                Derrière ce petit côté maniaque, il y a surtout une envie de bien faire et d’être fiable.
            </p>
        </Slide>
        <Slide id="citation" navLabel="Ma citation">
            <SlideCard><p>“You’re only human, so be human.”</p></SlideCard>
            <hr />
            <SlideHeader>Ma citation</SlideHeader>
            <p>
                Cette phrase me parle parce qu’elle rappelle quelque chose de simple :
                avant les fonctions, les diplômes, les objectifs ou les statuts, il y a des personnes.
            </p>
            <p>
                C’est aussi comme ça que je vois les ressources humaines.
                Pas seulement comme une fonction administrative, mais comme un métier de lien, d’écoute et
                d’accompagnement.
            </p>
        </Slide>
        <Slide id="song" navLabel="Ma chanson">
            <SlideCard footer="Santigold"><p>Disparate Youth</p></SlideCard>
            <hr />
            <SlideHeader>Ma chanson</SlideHeader>
            <p>
                Elle me parle pour son énergie, son côté libre, un peu différent, et surtout pour cette phrase: “
                <TextReplacement
                    text="a life worth fighting for"
                    replacement="une vie qui vaut la peine d’être défendue"
                />
                ”.
            </p>
            <p>
                Je l’associe à l’idée de construire une vie qui a du sens,
                de ne pas suivre un chemin uniquement parce qu’il est logique sur le papier,
                mais parce qu’il correspond vraiment à ce qu’on veut défendre.
            </p>
        </Slide>
        <Slide id="movie" navLabel="Mon film">
            <SlideCard footer="Christopher Nolan"><p>Interstellar</p></SlideCard>
            <hr />
            <SlideHeader>Mon film</SlideHeader>
            <p>
                Oui je sais, ce n’est pas très original.
                Les cinéphiles, je vous demande pardon d’avance : je sais qu’il ne fait pas l’unanimité.
                Mais moi, il me parle.
            </p>
            <p>
                C’est surtout parce que je suis fascinée par l’espace, l’univers, ce qu’on connaît, ce qu’on ne connaît pas, et tout ce qu’il reste encore à comprendre.
                Il y a quelque chose de presque vertigineux dans l’idée que l’on soit tout petits face à l’immensité, mais quand même capables de chercher, d’aimer, de transmettre et d’avancer.
            </p>
            <p>
                Ce film me touche aussi parce qu’il mélange la science, l’émotion, le temps, les choix, les liens humains.
                Et finalement, ça me ressemble assez bien : j’aime comprendre les choses, mais je reste profondément guidée par l’humain.
            </p>
            <BackgroundImage src="https://picsum.photos/800/1200" />
        </Slide>
        <Slide id="colour" navLabel="Ma couleur">
            <SlideHeader>Ma couleur</SlideHeader>
            <p>
                Depuis toujours, c’est le <b style={{ color: "#0000FF" }}>bleu</b>.
            </p>
            <p>
                <span>Le bleu foncé pour l’espace, la profondeur, le mystère, l’infini.</span><br />
                <span>Le bleu clair pour l’océan, le calme, la liberté, l’ouverture.</span>
            </p>
            <p>
                C’est une couleur qui représente bien deux parties de moi : mon côté rêveur, attiré par ce qui est grand, vaste, presque inaccessible ;
                et mon côté plus apaisé, qui a besoin de respirer, de bouger, de voir plus loin.
                En résumé : entre l’espace et l’océan, mon cœur n’a visiblement pas choisi. Il a juste pris les deux.
            </p>
        </Slide>
        <Slide id="place" navLabel="Mon endroit">
            <SlideHeader>Mon endroit</SlideHeader>
            <p>
                Mon endroit à moi, c’est ma voiture.
            </p>
            <p>
                Pas une voiture de collection, pas une voiture incroyable, pas le genre de voiture qu’on expose fièrement sur un parking.
                Juste ma petite <b>207</b>, vieille, pas forcément impressionnante au premier regard, mais qui représente beaucoup pour moi.
            </p>
            <p>

                C’est un espace de liberté. Un endroit où je chante, où je réfléchis, où je décompresse, où je pars voir mes amis, où je vis des discussions qui commencent par “on fait juste un tour” et qui finissent deux heures plus tard sur un parking.
                Ma voiture, c’est un peu mon sas entre les moments de vie : entre la maison et le travail, entre les responsabilités et les souvenirs, entre les trajets prévus et les détours improvisés.
            </p>
        </Slide>
    </PresentationLayout>;
}
