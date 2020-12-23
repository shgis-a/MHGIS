# Run this in qgis

from qgis.core import *

layername = ""
states=["Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Melaka", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu"]

for state in states:
    InDrPth='C:/programming/MHGIS/workfile/categorised_master/'+state+'.geojson'
    layer = QgsVectorLayer(InDrPth,state,"ogr")
    QgsProject.instance().addMapLayer(layer)
    
    outdir="C:/programming/MHGIS/workfile/categorised_master/"+state+"/"
    processing.run('qgis:splitvectorlayer', {'INPUT':layer, 'FIELD':"Category", 'FILE_TYPE':7, 'OUTPUT':outdir})