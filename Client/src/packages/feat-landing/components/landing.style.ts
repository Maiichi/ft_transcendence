import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
    --ui-color-brand: #353535;

    --ui-color-n-000: #fff;
    --ui-color-n-100: #f3e5f5;
    --ui-color-n-300: #aeaeae;
    --ui-color-n-500: #353535;
    --ui-color-n-700: #282828;
    --ui-color-n-900: #1a1a1a;

    --ui-color-background-primary: var(--ui-color-n-000);
    --ui-color-background-secondary: var(--ui-color-n-100);

    --ui-color-typography-heading: var(--ui-color-n-500);
    --ui-color-typography-body: var(--ui-color-n-900);
    --ui-color-typography-note: var(--ui-color-n-300);
    --ui-color-typography-button: var(--ui-color-n-000);

    --ui-typography-typeface: "Inter", sans-serif;

    --ui-typography-h1: 1.9375rem;
    --ui-typography-h2: 1.5625rem;
    --ui-typography-h4: 1rem;
    --ui-typography-p: 1rem;
    --ui-typography-s: 0.8125rem;

    --ui-typography-h1-leading: 1.2;
    --ui-typography-h2-leading: 1.2;
    --ui-typography-h4-leading: 1.25;
    --ui-typography-p-leading: 1.5;

    --ui-typography-margin-heading: 0.75rem;
    --ui-typography-margin-body: 1.125rem;

    --ui-layout-container: 1.25rem;
    --ui-layout-grid: 3.625rem;
    --ui-layout-gutter: 1rem;

    --ui-gap-cta: 0.75rem;
    --ui-gap-hero: 2rem;
    --ui-gap-feature: 2rem;
    --ui-gap-card: 1.25rem;

    --ui-radius-button: 5rem;
    --ui-radius-card: 0.5rem;
    }

    *,
    *:before,
    *:after {
    box-sizing: inherit;
    }

    a {
    color: var(--ui-color-brand);
    text-decoration: none;
    }

    h1,
    h2,
    h4,
    p {
    margin-top: 0;
    }

    h1,
    h2,
    h4 {
    color: var(--ui-color-typography-heading);
    }

    h1,
    h2 {
    margin-bottom: var(--ui-typography-margin-heading);
    }

    h1 {
    font-size: var(--ui-typography-h1);
    line-height: var(--ui-typography-h1-leading);
    }

    h2 {
    font-size: var(--ui-typography-h2);
    line-height: var(--ui-typography-h2-leading);
    }

    h4 {
    font-size: var(--ui-typography-h4);
    line-height: var(--ui-typography-h4-leading);
    }

    p {
    margin-bottom: var(--ui-typography-margin-body);
    }

    p:last-child {
    margin-bottom: 0;
    }

    strong {
    font-weight: 700;
    }

    small {
    font-size: var(--ui-typography-s);
    }

    .ui-text-note {
    color: var(--ui-color-typography-note);
    line-height: 1;
    }

    img,
    svg {
    display: block;
    border-radius: 10px;
    height: auto;
    margin: 0 auto;
    max-width: 100%;
    }

    .ui-layout-container {
    padding-left: var(--ui-layout-container);
    padding-right: var(--ui-layout-container);
    }

    .ui-layout-flex,
    .ui-layout-grid {
    align-items: center;
    justify-content: center;
    }

    .ui-layout-flex {
    display: flex;
    }

    .ui-layout-grid {
    display: grid;
    }

    .ui-component-cta {
    flex-direction: column;
    row-gap: var(--ui-gap-cta);
    }

    .ui-component-button {
    border: 0.0625rem solid var(--ui-color-brand);
    border-radius: var(--ui-radius-button);
    display: block;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    }

    .ui-component-button-primary {
    background-color: var(--ui-color-brand);
    color: var(--ui-color-typography-button);
    }

    .ui-component-button-normal {
    padding: 0.75rem 1rem 0.875rem;
    width: fit-content;
    }

    .ui-component-button-small {
    font-size: var(--ui-typography-s);
    padding: 0.5rem 0.75rem 0.5625rem;
    }

    .ui-component-card {
    background-color: var(--ui-color-background-secondary);
    border-radius: var(--ui-radius-card);
    overflow: hidden;
    padding: 2.25rem 1.5rem;
    text-align: center;
    width: 100%;
    }

    .ui-component-card--image {
    margin-bottom: 2.25rem;
    }

    .ui-component-card--title {
    margin-bottom: 0.5rem;
    }

    .ui-section-header {
    padding-bottom: 1.25rem;
    padding-top: 1.25rem;
    }

    .ui-section-header__layout {
    justify-content: space-between;
    }

    .ui-section-hero {
    padding-bottom: 5rem;
    padding-top: 5rem;
    text-align: center;
    }

    .ui-section-hero--image {
    margin-top: var(--ui-gap-hero);
    }

    .ui-section-skills {
    padding-bottom: 1.25rem;
    padding-top: 1.25rem;
    text-align: center;
    }

    .ui-section-skills__layout {
    margin-top: var(--ui-gap-feature);
    row-gap: var(--ui-gap-card);
    }

    .ui-section-close {
    padding-bottom: 5rem;
    padding-top: 5rem;
    text-align: center;
    }

    .ui-section-close--logo {
    margin-bottom: var(--ui-typography-margin-body);
    }

    .ui-section-footer {
    padding-bottom: 1.25rem;
    padding-top: 1.25rem;
    }

    .ui-section-footer__layout {
    column-gap: var(--ui-layout-gutter);
    }

    .ui-section-footer--copyright {
    margin-bottom: 0;
    margin-right: auto;
    }

    @media screen and (min-width: 48rem) {
    :root {
        --ui-typography-h1: 2.1875rem;
        --ui-typography-h2: 1.75rem;
        --ui-typography-h4: 1.125rem;
        --ui-typography-p: 1.125rem;
        --ui-typography-s: 0.875rem;

        --ui-typography-margin-body: 1.25rem;

        --ui-layout-container: 4.25rem;
        --ui-layout-gutter: 1.5rem;

        --ui-gap-hero: 3rem;
        --ui-gap-feature: 3rem;
        --ui-gap-card: 1.5rem;
    }

    .ui-layout-container,
    .ui-layout-column-center {
        margin-left: auto;
        margin-right: auto;
    }

    .ui-layout-grid-3 {
        column-gap: var(--ui-layout-gutter);
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
    }

    .ui-layout-grid-3 div:nth-of-type(3) {
        left: calc(50% + (var(--ui-layout-gutter) / 2));
        position: relative;
    }

    .ui-layout-column-6 {
        width: calc((var(--ui-layout-grid) * 6) + (var(--ui-layout-gutter) * 5));
    }

    .ui-component-card {
        padding-left: 2.25rem;
        padding-right: 2.25rem;
    }

    .ui-section-header {
        padding-bottom: 2rem;
        padding-top: 2rem;
    }

    .ui-section-feature {
        padding-bottom: 2rem;
        padding-top: 2rem;
    }

    .ui-section-close--logo {
        width: 4rem;
    }

    .ui-section-footer {
        padding-bottom: 2rem;
        padding-top: 2rem;
    }
    }

    @media screen and (min-width: 64rem) {
    :root {
        --ui-layout-container: 0;
    }

    a {
        transition: all 250ms ease;
    }

    a:not(.ui-component-button):hover {
        color: var(--ui-color-typography-body);
    }

    .ui-layout-container {
        width: 60rem;
    }

    .ui-layout-grid-3 {
        grid-template-columns: repeat(3, 1fr);
    }

    .ui-layout-grid-3 div:nth-of-type(3) {
        position: static;
    }
    }

    @media screen and (min-width: 75rem) {
    :root {
        --ui-typography-h1: 2.75rem;
        --ui-typography-h2: 2.1875rem;
        --ui-typography-h4: 1.4375rem;

        --ui-typography-margin-heading: 1rem;
        --ui-typography-margin-body: 1.75rem;

        --ui-layout-grid: 4rem;
        --ui-layout-gutter: 2rem;

        --ui-gap-hero: 4rem;
        --ui-gap-feature: 4rem;
        --ui-gap-card: 2rem;
    }

    .ui-text-intro {
        font-size: var(--ui-typography-h4);
    }

    .ui-layout-container {
        width: 70rem;
    }

    .ui-component-button-normal {
        padding-bottom: 1.125rem;
        padding-top: 1rem;
    }

    .ui-component-button-small {
        padding-bottom: 0.6875rem;
        padding-top: 0.625rem;
    }

    .ui-section-header {
        padding-bottom: 3rem;
        padding-top: 3rem;
    }

    .ui-section-hero {
        padding-bottom: 7.5rem;
        padding-top: 7.5rem;
    }

    .ui-section-feature {
        padding-bottom: 3rem;
        padding-top: 3rem;
    }

    .ui-section-close {
        padding-bottom: 7.5rem;
        padding-top: 7.5rem;
    }

    .ui-section-footer {
        padding-bottom: 3rem;
        padding-top: 3rem;
    }
    }
`;

const LHtml = styled.div`
  box-sizing: border-box;
  scroll-behavior: smooth;
`;

const Lbody = styled.div`
  background-color: var(--ui-color-background-primary);
  color: var(--ui-color-typography-body);
  font-family: var(--ui-typography-typeface);
  font-feature-settings: "liga", "kern";
  font-size: var(--ui-typography-p);
  font-weight: 400;
  line-height: var(--ui-typography-p-leading);
  margin: 0 auto;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

export { GlobalStyles, Lbody, LHtml };
