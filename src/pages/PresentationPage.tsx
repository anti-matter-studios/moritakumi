import { PresentationLayout } from "../components/PresentationLayout/PresentationLayout";
import {
    Slide,
    SlideCard,
    SlideCardGrid,
    SlideHeader,
} from "../components/Slide";
import { Timeline } from "../components/Timeline";

export function PresentationPage() {
    return (
        <PresentationLayout
            timeline={
                <Timeline>
                    <Timeline.Item id="landing">Home</Timeline.Item>
                    <Timeline.Item id="hobbies">Hobbies</Timeline.Item>
                    <Timeline.Item id="travels">Travels</Timeline.Item>
                    <Timeline.Item id="personality">Persona</Timeline.Item>
                    <Timeline.Item id="cv">CV</Timeline.Item>
                    <Timeline.Item id="future-projects">Projects</Timeline.Item>
                    <Timeline.Item id="thanks">Thanks</Timeline.Item>
                </Timeline>
            }
        >
            <Slide id="landing" navLabel="Home" tone="blue">
                <SlideHeader eyebrow="Presentation support site">Moritakumi</SlideHeader>
                <p>
                    A bright slide-based website foundation for a personal
                    presentation.
                </p>
            </Slide>

            <Slide id="hobbies" navLabel="Hobbies" tone="lilac">
                <SlideHeader eyebrow="Interests">Hobbie</SlideHeader>
                <p>
                    A future section for interests, habits, and creative routines
                    that shape the story.
                </p>
                <SlideCardGrid>
                    <SlideCard title="Creative">
                        <p>Placeholder space for making, learning, and tinkering.</p>
                    </SlideCard>
                    <SlideCard title="Personal">
                        <p>Placeholder space for favorite activities and rituals.</p>
                    </SlideCard>
                    <SlideCard title="Shared">
                        <p>Placeholder space for hobbies connected to other people.</p>
                    </SlideCard>
                </SlideCardGrid>
            </Slide>

            <Slide id="travels" navLabel="Travels" tone="mint">
                <SlideHeader eyebrow="Places">Travels</SlideHeader>
                <p>
                    A future section for journeys, maps, photos, and memorable
                    locations.
                </p>
            </Slide>

            <Slide
                id="personality"
                navLabel="Personality"
                shortNavLabel="Persona"
                tone="rose"
            >
                <SlideHeader eyebrow="Questionnaire">Personality</SlideHeader>
                <p>
                    A future section for personality questions, answers, and
                    presentation-friendly results.
                </p>
            </Slide>

            <Slide id="cv" navLabel="CV" tone="blue">
                <SlideHeader eyebrow="Background">Curriculum Vitae</SlideHeader>
                <p>
                    A future section for education, work history, skills, and
                    milestones.
                </p>
            </Slide>

            <Slide
                id="future-projects"
                navLabel="Future Projects"
                shortNavLabel="Projects"
                tone="lilac"
            >
                <SlideHeader eyebrow="Roadmap">Future Projects</SlideHeader>
                <p>
                    A future section for upcoming ideas, ambitions, and planned
                    work.
                </p>
            </Slide>

            <Slide id="thanks" navLabel="Thanks" tone="mint">
                <SlideHeader eyebrow="Closing">Special Thanks</SlideHeader>
                <p>A final slide for acknowledgements and the presentation ending.</p>
            </Slide>
        </PresentationLayout>
    );
}
