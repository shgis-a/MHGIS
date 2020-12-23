# This script processes a gejson file and splits it into the directory format needed by the website to work
# It should be ran in QGIS.

from qgis.core import *
from qgis.utils import iface


# Code to import csv file, change variables as needed
InFlnm='outfile.csv'
InDrPth='C:/programming/MHGIS/workfile/'
InFlPth="file:///"+InDrPth+InFlnm
uri = InFlPth+"?delimiter=%s&xField=%s&yField=%s" % (",","longitude","latitude")

url = "file:///C:/programming/MHGIS/workfile/outfile.csv"
bh = QgsVectorLayer(uri, InFlnm, "delimitedtext")

bh.isValid()
bh.setCrs(QgsCoordinateReferenceSystem(4326, QgsCoordinateReferenceSystem.EpsgCrsId))
QgsProject.instance().addMapLayer(bh)


processing.run('qgis:splitvectorlayer', {'INPUT':"outfile.csv", 'FIELD':"region", 'FILE_TYPE':7, 'OUTPUT':"C:/programming/MHGIS/workfile/categorised_master"})