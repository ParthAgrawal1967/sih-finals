import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportActionsPanel = ({ 
  dashboardData,
  className = '' 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const exportOptions = [
    {
      type: 'pdf',
      title: 'Policy Brief PDF',
      description: 'Comprehensive market overview for policy presentations',
      icon: 'FileText',
      size: '~2.5 MB',
      format: 'PDF'
    },
    {
      type: 'excel',
      title: 'Data Analysis Excel',
      description: 'Raw data and calculations for detailed analysis',
      icon: 'Sheet',
      size: '~1.8 MB',
      format: 'XLSX'
    },
    {
      type: 'powerpoint',
      title: 'Executive Summary PPT',
      description: 'Key insights formatted for stakeholder briefings',
      icon: 'Presentation',
      size: '~3.2 MB',
      format: 'PPTX'
    }
  ];

  const handleExport = async (type) => {
    setIsExporting(true);
    setExportType(type);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const timestamp = new Date()?.toISOString()?.slice(0, 19)?.replace(/:/g, '-');
      const option = exportOptions?.find(opt => opt?.type === type);
      const filename = `PalmTariff_Overview_${timestamp}.${option?.format?.toLowerCase()}`;
      
      // In a real implementation, this would trigger the actual export
      console.log(`Exporting ${filename} with data:`, dashboardData);
      
      // Show success feedback
      alert(`${option?.title} exported successfully!`);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Export & Reports</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Generate policy-ready reports with MEITY compliance
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
          <Icon name="Shield" size={14} className="text-success" />
          <span className="text-xs font-medium text-success">MEITY Certified</span>
        </div>
      </div>
      {/* Export Options */}
      <div className="space-y-4 mb-6">
        {exportOptions?.map((option) => (
          <div key={option?.type} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name={option?.icon} size={20} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground">{option?.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{option?.description}</p>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-muted-foreground">Format: {option?.format}</span>
                    <span className="text-xs text-muted-foreground">Size: {option?.size}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport(option?.type)}
                disabled={isExporting}
                loading={isExporting && exportType === option?.type}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <Button
          variant="default"
          iconName="Mail"
          iconPosition="left"
          className="justify-center"
          disabled={isExporting}
        >
          Email Reports
        </Button>
        
        <Button
          variant="outline"
          iconName="Share"
          iconPosition="left"
          className="justify-center"
          disabled={isExporting}
        >
          Share Dashboard
        </Button>
      </div>
      {/* Compliance Information */}
      <div className="space-y-3">
        <h3 className="font-medium text-card-foreground text-sm">Compliance & Security</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Lock" size={12} className="text-success" />
            <span>End-to-end encryption</span>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>Government certified</span>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Database" size={12} className="text-success" />
            <span>Secure data transit</span>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="FileCheck" size={12} className="text-success" />
            <span>Policy aligned</span>
          </div>
        </div>
      </div>
      {/* Export Status */}
      {isExporting && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <div>
              <p className="text-sm font-medium text-primary">Generating Report...</p>
              <p className="text-xs text-muted-foreground">
                Processing data with MEITY compliance standards
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportActionsPanel;