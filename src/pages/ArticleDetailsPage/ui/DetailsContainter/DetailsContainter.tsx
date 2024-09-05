// обертка над артиклДетайлс

import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';

interface DetailsContainterProps {
  className?: string;
}

export const DetailsContainter = memo((props: DetailsContainterProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Card max maxHeight border="partial" className={className} padding="24">
      <ArticleDetails id={id} />
    </Card>
  );
});
