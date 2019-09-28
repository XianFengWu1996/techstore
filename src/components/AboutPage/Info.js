import React from 'react'
import Title from '../Title'
import aboutBcg from '../../images/aboutBcg.jpeg'

export default function Info() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
         <div className="col-10 mx-auto col-md-6 my-3">
          <img src={aboutBcg} className="img-fluid img-thumbnail" alt="about company"
          style={{background:'var(--darkGrey)'}}
          />
         </div>

         <div className="col-10 mx-auto col-md-6 my-3">
          <Title title="about us"></Title>
          <p className="text-lead text-muted my-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, accusantium delectus! Dolorum corporis ipsa similique eveniet modi sequi iure molestias!
          </p>
          <button className="main-link" type="button">More info</button>
         </div>
        </div>
      </div>
      
    </section>
  )
}
