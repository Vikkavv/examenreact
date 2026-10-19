import React, { Component } from 'react'
import SeriesService from '../Services/SeriesService';
import { Navigate } from 'react-router-dom';

export default class InsertPersonaje extends Component {

    service = new SeriesService();
    state = {
        series: [],
        redirect: null
    }

    imagenRef = React.createRef();
    nombreRef = React.createRef();
    selectRef = React.createRef();

    sendFormInfo = async (e) => {
        e.preventDefault();
        let personaje = {
            idPersonaje: 0,
            nombre: this.nombreRef.current.value,
            imagen: this.imagenRef.current.value,
            idSerie: parseInt(this.selectRef.current.value)
        }
        //console.log(personaje);
        let result = await this.service.insertPersonaje(personaje);
        console.log(result);
        if(result === true) this.setState({
            redirect: this.selectRef.current.value
        })
    }

    async getAllSeries() {
        this.setState({
            series: await this.service.getAllSeries()
        })
    }

    componentDidMount(){
        this.getAllSeries();
    }

  render() {
    return (
      <main className="mx-auto max-w-2xl px-6 py-10">
        {
            this.state.redirect && <Navigate to={"/Personajes/" + this.state.redirect}/> 
        }
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
            <div className="border-b border-slate-100 bg-slate-50 px-8 py-7">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    Nuevo registro
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Crear personaje
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Completa los datos para añadir un personaje a una serie.
                </p>
            </div>
            <form onSubmit={this.sendFormInfo} className="space-y-6 p-8">
                <div>
                    <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-slate-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name='nombre'
                        id="nombre"
                        ref={this.nombreRef}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div>
                    <label htmlFor="imagen" className="mb-2 block text-sm font-medium text-slate-700">
                        Imagen
                    </label>
                    <input
                        type="text"
                        name='imagen'
                        id='imagen'
                        ref={this.imagenRef}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div>
                    <label htmlFor="select" className="mb-2 block text-sm font-medium text-slate-700">
                        Película
                    </label>
                    <select
                        name="select"
                        id="select"
                        ref={this.selectRef}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    >
                        {
                            this.state.series.map((serie, i) => {
                                return(<option key={i} value={serie.idSerie} >{serie.nombre}</option>)
                            })
                        }
                    </select>
                </div>

                <button
                    type='submit'
                    className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
                >
                    Crear Personaje
                </button>
            </form>
        </section>
      </main>
    )
  }
}
