import { useSearchParams } from 'react-router';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { PaginationFactory } from '@/shared/utils/paginationUtils';
import type { IPagination } from '@/heroes/interfaces/IPagination';
import { useHeroesContext } from '@/heroes/customHooks/useHeroesContext';
import { PaginationContext } from '@/heroes/context/PaginationContext';

interface Props {
    totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {

    const [, setSearchParams] = useSearchParams();

    const [pagination, setPagination] = useHeroesContext(PaginationContext);
    const page: number = pagination.page;

    const SetPagination = (page: number) => {

        if (page < 1 || page > totalPages) {
          return;
        }

        const newPagination: IPagination = PaginationFactory.CreatePaginationObject(page.toString(), pagination.limit.toString(), pagination.category);
        setPagination(newPagination);
        
        setSearchParams((prev) => {
          prev.set('page', newPagination.page.toString());
          prev.set('limit', newPagination.limit.toString());
          return prev;
        });
    }

  return (
    <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" 
            disabled={page === 1}
            onClick={() => SetPagination(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          { 
            Array.from( {length: totalPages} ).map((_, index) => {
                return <Button key={index} 
                variant={
                    page === index + 1 ? "default" : "outline"
                }
                onClick={() => SetPagination(index + 1)} 
                size="sm">
                    {index + 1}
                </Button>
            })
          }

          <Button variant="outline" size="sm"
            disabled={page === totalPages}
            onClick={() => SetPagination(page + 1)}
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
  )
}
