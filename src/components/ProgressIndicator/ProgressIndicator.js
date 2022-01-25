import { ProgressIndicator, ProgressStep } from 'carbon-components-react';

const ProgressIndicatorComp =()=>{

    return(
        <div className="some-container">
        <ProgressIndicator currentIndex={0}>
            <ProgressStep
              label="First step"
              description="Step 1: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Second step"
              description="Step 2: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Third step"
              description="Step 3: Getting started with Carbon Design System"
              secondaryLabel="Optional label"
            />
            <ProgressStep
              label="Fourth step"
              description="Step 4: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Fifth step"
              description="Step 5: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Sixth step"
              description="Step 6: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Seventh step"
              description="Step 7: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Eighth step"
              description="Step 8: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Nineth step"
              description="Step 9: Getting started with Carbon Design System"
            />
            <ProgressStep
              label="Tenth step"
              description="Step 10: Getting started with Carbon Design System"
            />
          </ProgressIndicator>
      </div>
    )
}

export default ProgressIndicatorComp;