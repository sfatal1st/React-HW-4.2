import { useState } from "react";

export default function trainingRecords () {
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}.${formattedMonth}.${year}`;
    }

    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');
  
    const handleAddData = (e) => {
      e.preventDefault();
  
      const newData = {
        date: date,
        distance: parseFloat(distance),
      };
  
      const existingData = data.find((item) => item.date === date);
  
      if (existingData) {
        existingData.distance += parseFloat(distance);
        setData([...data]);
      } else {
        const newDataList = [newData, ...data];
        newDataList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(newDataList);
      }
  
      setDate('');
      setDistance('');
    };
  
    const handleDeleteData = (date) => {
      const newDataList = data.filter((item) => item.date !== date);
      setData(newDataList);
    };
  
    return (
      <div>
        <h1>Отслеживание тренировок и прогулок</h1>
  
        <form onSubmit={handleAddData}>
          <label>
            Дата:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Пройденные километры:
            <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
          </label>
          <button type="submit">ОК</button>
        </form>
  
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Пройдено километров</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.date}>
                <td>{formatDate(item.date)}</td>
                <td>{item.distance}</td>
                <td className="delete-icon" onClick={() => handleDeleteData(item.date)}>✘</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  