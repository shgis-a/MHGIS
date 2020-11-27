
from qgis.core import *

layername = ""

# for x in range(14):
x=0

layername = "layer_"+str(x)
indir = 'C:/programming/MHGIS/workfile/categorised_master/region_'+str(x)+'.shp'

layer = QgsVectorLayer(indir, layername, "ogr")
QgsProject.instance().addMapLayer(layer)

# for field in layer.fields():
    # print(field.name())
    
print(layer.selectByExpression('"Country"="Malaysia"').atrributes())
