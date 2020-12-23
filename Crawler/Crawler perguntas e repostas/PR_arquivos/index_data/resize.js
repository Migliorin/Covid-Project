(function()
{
    
    
    
    if ((! window.ZHFireEvent) || (typeof(window.ZHFireEvent) !== 'function')) 
    {
    
        window.ZHFireEvent   =   function (type)
        {
        
            if ((! type) || (! type.length)) {
                type    =   'ZH:noop';
            }
            
            // Tipo do evento e objeto de evento
            var event;
            
            // Criação do evento
            if (document.createEvent) {
                
                event = document.createEvent("HTMLEvents");
                event.initEvent(type, true, true);
                
            } else {
                event           =   document.createEventObject();
                event.eventType =   type;
            }
            
            // Nome do evento
            event.eventName =   type;
            
            // Trigger do evento
            if (document.createEvent) {
                
                document.dispatchEvent(event);
                
            } else {
                
                document.fireEvent("on" + event.eventType, event);
                
            }
        
        };
    
    }
    
    
    
    
    
    /**
     *
     *  Dispara um resize
     *
     **/
    if ((! window.ZHFireResize) || (typeof(window.ZHFireResize) !== 'function')) 
    {
        
         window.ZHFireResize    =   function ()
         {
             
            window.ZHFireEvent('resize');
             
         };
        
    }

    
    
    
})();
