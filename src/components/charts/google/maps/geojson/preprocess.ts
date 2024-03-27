import union from '@turf/union'
import * as turf from '@turf/helpers'
import fs from 'fs-extra'

// Carregando os dados GeoJSON. Se você estiver usando o CommonJS, o `require` é adequado.
// Se os dados não mudam, você pode preferir usar importações estáticas.
import ceilandiaData from './ceilandia.geo.json'
import solnascenteData from './solnascente.geo.json'

// Convertendo as features para o tipo correto
const turfCeilandia = turf.feature(
  ceilandiaData.features[0].geometry,
) as turf.Feature<turf.Polygon | turf.MultiPolygon>
const turfSolNascente = turf.feature(
  solnascenteData.features[0].geometry,
) as turf.Feature<turf.Polygon | turf.MultiPolygon>

// Realize a união dos GeoJSONs aqui. Ajuste conforme necessário para o seu caso de uso específico.
const unifiedGeoJson = union(turfCeilandia, turfSolNascente)

async function saveToFile() {
  try {
    await fs.writeJson('./unifiedGeoJson.geojson', unifiedGeoJson)
    console.log('Arquivo GeoJSON unificado salvo com sucesso.')
  } catch (error) {
    console.error('Erro ao salvar o arquivo:', error)
  }
}

saveToFile()
