import React, { Component } from 'react'
import {Input, Label} from './components/Form/Form'
import Button from './components/Button/Button'

export class TranslateForm extends Component {
    render() {
        return (
            
            <form className="transform">
                <Label htmlFor="trans-form-input">
                    What is the translation for this word?</Label>
                    
                <Input 
                id="answer-input" 
                name="trans-form-input"
                type="text"
                required
                />
                <Button type="button" > 
                Submit
                </Button>
            </form>
        
        )
    }
}

export default TranslateForm
