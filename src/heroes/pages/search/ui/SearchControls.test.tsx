import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";
import { SearchHeroesConstants } from "@/heroes/constants/SearchHeroesConstants";

if (typeof window.ResizeObserver === 'undefined'){
    class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }

    window.ResizeObserver = ResizeObserver;
}

const renderSearchControls = (initialEntries?: string[]) => {
    return render( 
        <MemoryRouter initialEntries={initialEntries} >
            <SearchControls></SearchControls>
        </MemoryRouter>
    );
}

describe('SearchControls', () => {

    test('should render search controls with default values', () => {
        const {container} = renderSearchControls();

        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {

        const param: string = 'batman';

        renderSearchControls([`/?name=${param}`]);

        const input = screen.getByPlaceholderText("Search heroes, villains, powers, teams...");
        
        expect(input.getAttribute('value')).toBe(param);

    });

    test('should change params when input is changed and enter is pressed', () => {

        const param: string = 'batman';

        renderSearchControls([`/?name=${param}`]);

        const input = screen.getByPlaceholderText("Search heroes, villains, powers, teams...");
        
        expect(input.getAttribute('value')).toBe(param);

        fireEvent.change(input, {target: { value: 'Superman'}});
        fireEvent.keyDown(input, {key: 'Enter'});

        expect(input.getAttribute('value')).toBe('Superman');

    });

    test('should change params strength when slider changes', () => {
        const param: string = 'batman';
        renderSearchControls([`/?name=${param}&active-accordion=${SearchHeroesConstants.FilterAccordionKey}`]);

        const slider = screen.getByRole('slider');

        expect(slider.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(slider, {key: 'ArrowRight'});

        expect(slider.getAttribute('aria-valuenow')).toBe('1');
    });

    test('should accordion be open when active-accordion param is set', () => {
        const param: string = 'batman';
        renderSearchControls([`/?name=${param}&active-accordion=${SearchHeroesConstants.FilterAccordionKey}`]);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('open');
    });

    test('should accordion be open when active-accordion param is not set', () => {
        const param: string = 'batman';
        renderSearchControls([`/?name=${param}`]);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('closed');
    });
});