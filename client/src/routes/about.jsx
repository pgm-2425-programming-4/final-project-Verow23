import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: About,
})

function About() {
    return (<div className='about-page'>
        <h1 className='title is-1'>About</h1>
        <section className='section'>
            <h2 className='subtitle is-2'>About this project</h2>
            <p>This project was made as the exam assignment for the course <strong>PGM 4</strong>. It is a kanban board where you can review your tasks per project. You can add new tasks, manage existing tasks and view the backlog. This project was made using <code>React</code>, <code>Tanstack</code> and <code>Strapi</code>. </p>
        </section>
        <section className='section'>
            <h2 className='subtitle is-2'>About Kanban</h2>
            <p>Here is a quote from Atlassian website: </p>
            <blockquote cite='https://www.atlassian.com/agile/kanban/boards#:~:text=A%20kanban%20board%20is%20an,order%20in%20their%20daily%20work.'>A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). It can help both agile and DevOps teams establish order in their daily work. </blockquote>
        </section>
        <section className='section'>
            <h2 className='subtitle is-2'>About me</h2>
            <p>I am a student at ArteveldeHogeschool Ghent.</p>
            <p>Find me on <a href="https://www.linkedin.com/in/v%C3%A9ronique-waroux-01146b141/" target='_blank'>LinkedIn</a>!</p>
        </section>
    </div>)
}