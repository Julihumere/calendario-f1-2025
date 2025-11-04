# 📊 Plantilla para Cargar Resultados de GP - Calendario F1 2025

## Formato del archivo Excel

El archivo Excel debe tener las siguientes columnas (puedes usar cualquiera de estos nombres):

| Columna      | Nombres aceptados             | Ejemplo                    | Descripción                           |
| ------------ | ----------------------------- | -------------------------- | ------------------------------------- |
| **Posición** | `position`, `Position`, `Pos` | 1, 2, 3, "NC", "DQ"        | Posición final del piloto             |
| **Número**   | `number`, `Number`, `Numero`  | 4, 81, 1                   | Número del piloto (importante)        |
| **Piloto**   | `driver`, `Driver`, `Piloto`  | "Lando Norris"             | Nombre completo del piloto            |
| **Equipo**   | `team`, `Team`, `Equipo`      | "mcl"                      | Código del equipo (ver códigos abajo) |
| **Vueltas**  | `laps`, `Laps`, `Vueltas`     | 71                         | Número de vueltas completadas         |
| **Tiempo**   | `time`, `Time`, `Tiempo`      | "1:37:58.574" o "+30.324s" | Tiempo total o diferencia             |
| **Puntos**   | `points`, `Points`, `Puntos`  | 25                         | Puntos obtenidos                      |

## Códigos de Equipos

| Equipo           | Código |
| ---------------- | ------ |
| McLaren Mercedes | `mcl`  |
| Ferrari          | `fer`  |
| Red Bull Racing  | `redb` |
| Mercedes         | `mer`  |
| Aston Martin     | `ast`  |
| Williams         | `will` |
| Haas F1 Team     | `haas` |
| Kick Sauber      | `kick` |
| Racing Bulls     | `rb`   |
| Alpine Renault   | `alp`  |

## Ejemplo de Datos en Excel

```
position | number | driver           | team  | laps | time         | points
---------|--------|------------------|-------|------|--------------|--------
1        | 4      | Lando Norris     | mcl   | 71   | 1:37:58.574  | 25
2        | 16     | Charles Leclerc  | fer   | 71   | +30.324s     | 18
3        | 1      | Max Verstappen   | redb  | 71   | +31.049s     | 15
4        | 50     | Oliver Bearman   | haas  | 71   | +40.955s     | 12
5        | 81     | Oscar Piastri    | mcl   | 71   | +42.065s     | 10
6        | 12     | Kimi Antonelli   | mer   | 71   | +47.837s     | 8
7        | 63     | George Russell   | mer   | 71   | +50.287s     | 6
8        | 44     | Lewis Hamilton   | fer   | 71   | +56.446s     | 4
9        | 31     | Esteban Ocon     | haas  | 71   | +75.464s     | 2
10       | 5      | Gabriel Bortoleto| kick  | 71   | +76.863s     | 1
11       | 22     | Yuki Tsunoda     | redb  | 71   | +79.048s     | 0
12       | 23     | Alexander Albon  | will  | 70   | +1 lap       | 0
13       | 6      | Isack Hadjar     | rb    | 70   | +1 lap       | 0
14       | 18     | Lance Stroll     | ast   | 70   | +1 lap       | 0
15       | 10     | Pierre Gasly     | alp   | 70   | +1 lap       | 0
16       | Franco Colapinto | alp   | 70   | +1 lap       | 0
NC       | Fernando Alonso  | ast   | 34   | DNF          | 0
NC       | Nico Hulkenberg  | kick  | 25   | DNF          | 0
NC       | Liam Lawson      | rb    | 5    | DNF          | 0
```

## Instrucciones de Uso

1. **Crea un archivo Excel** (.xlsx o .xls) con las columnas mencionadas arriba
2. **Llena los datos** de los resultados del Gran Premio
3. **Accede al panel de Admin** en tu aplicación
4. **Selecciona el Gran Premio** que quieres actualizar de la lista de la izquierda
5. **Haz clic en "📊 Cargar Excel"** y selecciona tu archivo
6. **Verifica los datos** cargados en la tabla
7. **Haz clic en "💾 Guardar Resultados"** para generar el JSON
8. El JSON se **copiará automáticamente al portapapeles**
9. **Pega el JSON** en el archivo `src/json/data.json` en el lugar correspondiente

## Notas Importantes

- ✅ Las posiciones "NC" (No Clasificado) y "DQ" (Descalificado) son válidas
- ✅ Los tiempos pueden ser absolutos (1:37:58.574) o relativos (+30.324s)
- ✅ El tiempo "DNF" indica que el piloto no terminó la carrera
- ✅ Los nombres de las columnas NO son sensibles a mayúsculas/minúsculas
- ⚠️ Asegúrate de usar los códigos de equipo correctos (ver tabla arriba)
- ⚠️ El piloto en P1 será el ganador y se mostrará en el podio

## Resultado Final

El sistema generará automáticamente:

- 🏆 **Podio**: Los 3 primeros pilotos con sus fotos
- 📋 **LeaderBoard**: Clasificación completa con todos los pilotos
- 🏁 **Pole Position**: Información del ganador (deberás ajustar el tiempo de pole manualmente si es necesario)

## Ejemplo de Output JSON

```json
{
  "podium": [
    {
      "position": 1,
      "driver": "Lando Norris",
      "team": "mcl",
      "photo": "/pilots/landonorris.avif"
    },
    {
      "position": 2,
      "driver": "Charles Leclerc",
      "team": "fer",
      "photo": "/pilots/charlesleclerc.avif"
    },
    {
      "position": 3,
      "driver": "Max Verstappen",
      "team": "redb",
      "photo": "/pilots/maxverstappen.avif"
    }
  ],
  "leaderBoard": [
    {
      "position": 1,
      "driver": "Lando Norris",
      "team": "mcl",
      "laps": 71,
      "time": "1:37:58.574",
      "points": 25
    }
    // ... más pilotos
  ],
  "polePosition": {
    "driver": "Lando Norris",
    "team": "Gran Premio de la Ciudad de México",
    "time": "1:XX.XXX"
  }
}
```

---

¡Listo! Ahora puedes actualizar fácilmente los resultados de cualquier GP con solo cargar un Excel. 🏎️💨
