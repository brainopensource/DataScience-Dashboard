import React from 'react';
import { InformationGrid } from '../../components/features/information/InformationGrid';
import { informationContent } from '../../data/information/informationData';

const Informations: React.FC = () => {
  return <InformationGrid content={informationContent} variant="default" />;
};

export default Informations;
