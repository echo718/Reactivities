import { Button, ButtonContent, Loader } from 'semantic-ui-react';
import './style.css';

interface CustomAnimatedButtonProps {
    visibleText: string;
    hiddenText: string;
    onClick: () => void;
    isLoading: boolean;
}

export const CustomAnimatedButton = (props: CustomAnimatedButtonProps) => {
    return (
        <div>
            {props.isLoading ? (
                <Loader active size="small" inline />
            ) : (
                <Button
                    animated
                    className="animated-button"
                    onClick={props.onClick}
                >
                    <ButtonContent visible>{props.visibleText}</ButtonContent>
                    <ButtonContent hidden>{props.hiddenText}</ButtonContent>
                </Button>
            )}
        </div>
    );
};
