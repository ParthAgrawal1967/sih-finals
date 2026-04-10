import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RegionalBreakdown = ({ regionalData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [sortBy, setSortBy] = useState('progress');

  const sortedData = [...regionalData]?.sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return b?.progress - a?.progress;
      case 'area':
        return b?.palmArea - a?.palmArea;
      case 'funding':
        return b?.fundingUtilization - a?.fundingUtilization;
      case 'farmers':
        return b?.farmerParticipation - a?.farmerParticipation;
      default:
        return a?.state?.localeCompare(b?.state);
    }
  });

  const getStatusColor = (progress) => {
    if (progress >= 80) return 'bg-success text-success-foreground';
    if (progress >= 60) return 'bg-warning text-warning-foreground';
    if (progress >= 40) return 'bg-primary text-primary-foreground';
    return 'bg-error text-error-foreground';
  };

  const getStatusLabel = (progress) => {
    if (progress >= 80) return 'Excellent';
    if (progress >= 60) return 'Good';
    if (progress >= 40) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">State-wise Implementation Progress</h3>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-muted-foreground">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="progress">Overall Progress</option>
            <option value="area">Palm Area</option>
            <option value="funding">Funding Utilization</option>
            <option value="farmers">Farmer Participation</option>
            <option value="name">State Name</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* States List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedData?.map((region) => (
            <div
              key={region?.state}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-elevation-1 ${
                selectedRegion?.state === region?.state 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedRegion(region)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{region?.state}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(region?.progress)}`}>
                  {getStatusLabel(region?.progress)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Progress:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          region?.progress >= 80 ? 'bg-success' :
                          region?.progress >= 60 ? 'bg-warning' :
                          region?.progress >= 40 ? 'bg-primary' : 'bg-error'
                        }`}
                        style={{ width: `${region?.progress}%` }}
                      />
                    </div>
                    <span className="font-medium text-foreground">{region?.progress}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Palm Area:</span>
                  <div className="font-medium text-foreground">{region?.palmArea} Lakh Ha</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Region Details */}
        <div className="bg-muted/30 rounded-lg p-6">
          {selectedRegion ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-foreground">{selectedRegion?.state}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRegion?.progress)}`}>
                  {selectedRegion?.progress}% Complete
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Sprout" size={16} className="text-success" />
                    <span className="text-sm font-medium text-muted-foreground">Oil Palm Area</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{selectedRegion?.palmArea}</div>
                  <div className="text-sm text-muted-foreground">Lakh Hectares</div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Farmers Enrolled</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{selectedRegion?.farmerParticipation?.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-muted-foreground">Active Participants</div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="IndianRupee" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-muted-foreground">Funding Utilized</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{selectedRegion?.fundingUtilization}%</div>
                  <div className="text-sm text-muted-foreground">₹{selectedRegion?.fundingAmount} Cr</div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Factory" size={16} className="text-secondary" />
                    <span className="text-sm font-medium text-muted-foreground">Processing Units</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{selectedRegion?.processingUnits}</div>
                  <div className="text-sm text-muted-foreground">Operational</div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-foreground">Key Achievements</h5>
                {selectedRegion?.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span className="text-sm text-muted-foreground">{achievement}</span>
                  </div>
                ))}
              </div>

              {selectedRegion?.challenges?.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h5 className="font-medium text-foreground">Current Challenges</h5>
                  {selectedRegion?.challenges?.map((challenge, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                      <span className="text-sm text-muted-foreground">{challenge}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Click on any state from the list to view detailed progress information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionalBreakdown;