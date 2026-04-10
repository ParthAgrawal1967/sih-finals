import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import FarmersTab from './FarmersTab';
import ConsumersTab from './ConsumersTab';
import GovernmentTab from './GovernmentTab';

const StakeholderTabs = ({ simulationData }) => {
  const [activeTab, setActiveTab] = useState('farmers');

  const tabs = [
    {
      id: 'farmers',
      label: 'Farmers',
      icon: 'Leaf',
      description: 'Agricultural sector impact analysis',
      component: FarmersTab
    },
    {
      id: 'consumers',
      label: 'Consumers',
      icon: 'ShoppingCart',
      description: 'Consumer price and purchasing power effects',
      component: ConsumersTab
    },
    {
      id: 'government',
      label: 'Government',
      icon: 'Building2',
      description: 'Revenue, trade balance, and policy metrics',
      component: GovernmentTab
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 sm:border-b-0 sm:border-r ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted border-transparent'
              } ${tab?.id === 'government' ? 'sm:border-r-0' : ''}`}
            >
              <Icon 
                name={tab?.icon} 
                size={20} 
                className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
              <div className="text-left">
                <div className="font-medium">{tab?.label}</div>
                <div className={`text-xs ${
                  activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {tab?.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="min-h-[600px]">
        {ActiveComponent && <ActiveComponent simulationData={simulationData} />}
      </div>
    </div>
  );
};

export default StakeholderTabs;