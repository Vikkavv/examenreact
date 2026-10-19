import React, { Component } from 'react'
import SeriesService from '../Services/SeriesService';
import { NavLink } from 'react-router-dom';

export default class SerieComponent extends Component {

    service = new SeriesService();
    state = {
        serie: null
    }

    getSerie = async () => {
        this.setState({
            serie: await this.service.getSerieById(this.props.id)
        });
    }

    componentDidMount(){
        this.getSerie();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.id != this.props.id){
            this.getSerie();
        }
    }

  render() {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        {
            this.state.serie &&
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
                <div className="grid md:grid-cols-2">
                    <img
                        src={this.state.serie.imagen}
                        alt=""
                        className="h-72 w-full object-cover md:h-full md:min-h-96"
                    />
                    <div className="flex flex-col items-start justify-center p-8 md:p-10">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Ficha de la serie
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            {this.state.serie.nombre}
                        </h1>
                        <div className="mt-8 grid w-full grid-cols-2 gap-4">
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-500">Puntuación</p>
                                <p className="mt-1 text-xl font-semibold text-slate-900">
                                    {this.state.serie.puntuacion}
                                </p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-500">Año de salida</p>
                                <p className="mt-1 text-xl font-semibold text-slate-900">
                                    {this.state.serie.anyo}
                                </p>
                            </div>
                        </div>
                        <NavLink
                            to={"/Personajes/" + this.state.serie.idSerie}
                            className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Personajes
                        </NavLink>
                    </div>
                </div>
            </div>
        }
      </main>
    )
  }
}
