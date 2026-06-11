import { PresentationLayout } from "../components/PresentationLayout/PresentationLayout";
import {
    Slide,
    SlideCard,
    SlideCardGrid,
    SlideHeader,
} from "../components/Slide/Slide";

export function PresentationPage() {
    return (
        <PresentationLayout>
            <Slide id="landing" navLabel="Home" tone="blue">
                <SlideHeader eyebrow="Presentation support site" title="Moritakumi">
                    <p>
                        A bright slide-based website foundation for a personal
                        presentation.
                    </p>
                </SlideHeader>
            </Slide>

            <Slide id="hobbies" navLabel="Hobbies" tone="lilac">
                <SlideHeader eyebrow="Interests" title="Hobbies">
                    <p>
                        A future section for interests, habits, and creative routines
                        that shape the story.
                    </p>
                </SlideHeader>
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
                <SlideHeader eyebrow="Places" title="Travels">
                    <p>
                        A future section for journeys, maps, photos, and memorable
                        locations.
                    </p>
                </SlideHeader>
            </Slide>

            <Slide
                id="personality"
                navLabel="Personality"
                shortNavLabel="Persona"
                tone="rose"
            >
                <SlideHeader eyebrow="Questionnaire" title="Personality">
                    <p>
                        A future section for personality questions, answers, and
                        presentation-friendly results.
                    </p>
                </SlideHeader>
            </Slide>

            <Slide id="cv" navLabel="CV" tone="blue">
                <SlideHeader eyebrow="Background" title="Curriculum Vitae">
                    <p>
                        A future section for education, work history, skills, and
                        milestones.
                    </p>
                </SlideHeader>
            </Slide>

            <Slide
                id="future-projects"
                navLabel="Future Projects"
                shortNavLabel="Projects"
                tone="lilac"
            >
                <SlideHeader eyebrow="Roadmap" title="Future Projects">
                    <p>
                        A future section for upcoming ideas, ambitions, and planned
                        work.
                    </p>
                </SlideHeader>
            </Slide>

            <Slide id="thanks" navLabel="Thanks" tone="mint">
                <SlideHeader eyebrow="Closing" title="Special Thanks">
                    <p>A final slide for acknowledgements and the presentation ending.</p>
                </SlideHeader>
            </Slide>
        </PresentationLayout>
    );
}
