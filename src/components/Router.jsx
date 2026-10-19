import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import SerieComponent from './SerieComponent';
import PersonajesComponent from './PersonajesComponent';
import InsertPersonaje from './InsertPersonaje';
import UpdatePersonaje from './UpdatePersonaje';

export default class Router extends Component {
  render() {

    function SerieComponentElement(){
        let { id } = useParams();
        return(<SerieComponent id={id} />)
    }

    function PersonajesComponentElement(){
        let { idPelicula } = useParams();
        return(<PersonajesComponent id={idPelicula} />)
    }

    return (
      <BrowserRouter>
        <MenuComponent/>
        <Routes>
            <Route path='/' element={<HomeComponent/>} />
            <Route path='/CreatePersonaje' element={<InsertPersonaje/>} />
            <Route path='/UpdatePersonaje' element={<UpdatePersonaje/>} />
 
            <Route path='/Serie/:id' element={<SerieComponentElement/>} />
            <Route path='/Personajes/:idPelicula' element={<PersonajesComponentElement/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}
