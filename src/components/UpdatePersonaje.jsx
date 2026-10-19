import React, { Component } from 'react'
import SeriesService from '../Services/SeriesService';
import { Navigate } from 'react-router-dom';

export default class UpdatePersonaje extends Component {

  service = new SeriesService();
  counter = 0;


  seriesRef = React.createRef();
  personajesRef = React.createRef();

  state = {
    series: [],
    personajes: [],
    redirect: null
  }

  async getAllSeries(){
    this.setState({
      series: await this.service.getAllSeries()
    })
  }

  async getAllPersonajes() {
    this.setState({
      personajes: await this.service.getAllPersonajes()
    })
  }

  sendFormInfo = async (e) => {
    e.preventDefault();
    let personajeSeleccionado = this.state.personajes[parseInt(this.personajesRef.current.value)];
    personajeSeleccionado.idSerie = parseInt(this.seriesRef.current.value);
    let result = await this.service.updatePersonaje(personajeSeleccionado);
    if(result){
      this.setState({
        redirect: this.seriesRef.current.value
      })
    }
  }

  componentDidMount(){
    this.getAllSeries();
    this.getAllPersonajes();
  }

  render() {
    return (
      <main className="mx-auto max-w-2xl px-6 py-10">
        {this.state.redirect && <Navigate to={"/Personajes/" + this.state.redirect}/>}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          <div className="border-b border-slate-100 bg-slate-50 px-8 py-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Gestión de personajes
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Modificar personaje
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Elige una serie y el personaje que quieres actualizar.
            </p>
          </div>
          <form onSubmit={this.sendFormInfo} className="space-y-6 p-8">
            <div>
              <label htmlFor="series" className="mb-2 block text-sm font-medium text-slate-700">
                Selecciona una serie
              </label>
              <select
                name="series"
                id="series"
                ref={this.seriesRef}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                {
                  this.state.series.map((serie) => {
                    return(<option key={this.counter++} value={serie.idSerie} >{serie.nombre}</option>)
                  })
                }
              </select>
            </div>

            <div>
              <label htmlFor="personajes" className="mb-2 block text-sm font-medium text-slate-700">
                Selecciona un personaje
              </label>
              <select
                name="personajes"
                id="personajes"
                ref={this.personajesRef}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                {
                  this.state.personajes.map((personaje, i) => {
                    return(<option key={this.counter++} value={i}>{personaje.nombre}</option>)
                  })
                }
              </select>
            </div>
            <button
              type='submit'
              className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
            >
              Modificar
            </button>
          </form>
        </section>
      </main>
    )
  }
}
