import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../public/database/firebase';
import './App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Chart, registerables } from "chart.js";
import { Line } from 'react-chartjs-2';
Chart.register(...registerables);

function App() {


  useEffect(() => {
    fecthOrdenes();
    getSemanaString();
  }, [])

  const [semana, setSemana] = useState([]);

  const [venta, setVenta] = useState();

  const fecthOrdenes = async () => {
    const q = query(collection(db, "Venta"));
    const querySnapshot = await getDocs(q);

    const cuentas = [];
    // const pedido = [];

    querySnapshot.forEach((doc) => {
      const { cliente, fecha, id, mesa, total } = doc.data();
      let date = new Date(fecha);
      let cuenta = {
        cliente: cliente,
        fecha: date,
        id: id,
        mesa: mesa,
        total: total,
      };

      // pedido.push(pedidos);
      cuentas.push(cuenta);
    });
    setVenta(cuentas);

    let t = 0;
  };

  const days = [
    {
      id: 0,
      dia: 'Lunes',
      total: 0
    },
    {
      id: 1,
      dia: 'Martes',
      total: 0
    },
    {
      id: 2,
      dia: 'Miercoles',
      total: 0
    },
    {
      id: 3,
      dia: 'Jueves',
      total: 0
    },
    {
      id: 4,
      dia: 'Viernes',
      total: 0
    },
    {
      id: 5,
      dia: 'Sabado',
      total: 0
    },
    {
      id: 6,
      dia: 'Domingo',
      total: 0
    },
  ];

  const porSemana = async () => {
    var HaceUnaSemana = new Date(startDate - (24 * 60 * 60 * 1000) * 7);
    var resultProductData = venta.filter(a => {
      var dates = new Date(a.fecha);
      return (dates >= HaceUnaSemana && dates <= startDate);
    });
    console.log(resultProductData);
    setSemana(resultProductData);
  }

  const [pasada, setPasada] = useState([]);

  const getSemanaString = () => {
    let d = startDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year - 1, month, day);
    var HaceUnaSemana = new Date(c - (24 * 60 * 60 * 1000) * 7);
    setFechaaño( FechaBien(HaceUnaSemana));
  }

  const [fechaaño,setFechaaño] = useState();

  const semanaAñoPasado = () => {
    let d = startDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year - 1, month, day);
    var HaceUnaSemana = new Date(c - (24 * 60 * 60 * 1000) * 7);

    var resultProductData = venta.filter(a => {
      var dates = new Date(a.fecha);
      return (dates >= HaceUnaSemana && dates <= c);
    });

    setPasada(resultProductData);

  }

  const [startDate, setStartDate] = useState(new Date());

  const FechaBien = (date) => {
    var dateObj = date;
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return year + "/" + month + "/" + day;
  };

  const [dias, setDias] = useState(days);

  const calcularValor = () => {
    semana.forEach((se) => {
      var day = se.fecha.getDay();

      if (day === 1) {
        days[0].total += se.total;
      }
      if (day === 2) {
        days[1].total += se.total;
      }
      if (day === 3) {
        days[2].total += se.total;
      }
      if (day === 4) {
        days[3].total += se.total;
      }
      if (day === 5) {
        days[4].total += se.total;
      }
      if (day === 6) {
        days[5].total += se.total;
      }
      if (day === 0) {
        days[6].total += se.total;
      }
    })
    setDias(days);
    getTotalSemana();
  }

  const calcularValorPasado = () => {
    pasada.forEach((se) => {
      var day = se.fecha.getDay();

      if (day === 1) {
        days[0].total += se.total;
      }
      if (day === 2) {
        days[1].total += se.total;
      }
      if (day === 3) {
        days[2].total += se.total;
      }
      if (day === 4) {
        days[3].total += se.total;
      }
      if (day === 5) {
        days[4].total += se.total;
      }
      if (day === 6) {
        days[5].total += se.total;
      }
      if (day === 0) {
        days[6].total += se.total;
      }
    })
    setDiasPasado(days);
  }

  const [diasPasado, setDiasPasado] = useState([]);

  const getTotalSemana = () => {
    let total = [];
    dias.forEach((se) => {
      total.push(se.total);
    })
    setTotalSemana(total);
  }

  const getTotalSemanaPasada = () => {
    let total = [];
    diasPasado.forEach((se) => {
      total.push(se.total);
    })
    setTotalSemanaPasada(total);

  }
  const [totalSemanaPada, setTotalSemanaPasada] = useState([]);


  const [totalSemana, setTotalSemana] = useState([]);

  const data = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    datasets: [
      {
        label: FechaBien(startDate),
        data: totalSemana,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.3)",
        borderColor: "#1AB394",
      },
      {
        label: fechaaño,
        data: [0],
        fill: true,
        borderColor: "#742774",
      },

    ],
  };

  const changeDate = (date) => {
    setStartDate(date);
    porSemana();
    calcularValor();
    getSemanaString();
  }

  return (
    <div className="App">
      <div className="titulo">
        <h2>Comparar entre semana</h2>

      </div>
      <div className="fecha">
        <DatePicker selected={startDate} onChange={(date) => changeDate(date)} />

      </div>
      <div className="grafica">
        <Line data={data} />

      </div>
      <div className="boton">
        <button onClick={() => {
          porSemana();
          calcularValor();
          semanaAñoPasado();
          // calcularValorPasado();
        }}>Comparar semanas</button>
      </div>
    </div>
  )
}

export default App
