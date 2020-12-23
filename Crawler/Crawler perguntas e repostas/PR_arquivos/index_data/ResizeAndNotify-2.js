/**
 *
 *  Script que faz a comunicação com o iframe responsivo no documento pai
 *  Esse script deve ser colocado em todos os documentos embedados utilizando-se 
 *  O EnterScriptMan.x.x.x.js
 *
 *  @author Maron, Guilherme
 *
 *  @version    2.0.0
 *  @date       2017-09-18
 *
 *  @changelog  0.0.1   Agora o ResizeAndNotify funciona em páginas isoladas (sem ser embeddada)
 *  @changelog  0.0.2   Mantendo a versão junto com o EnterScriptMan
 *  @changelog  0.0.3   Há disparo de eventos conforme o iframe está ou não visível para o usuário
 *  @changelog  0.0.4   Using querySelector
 *  @changelog  0.0.5   Safety measures
 *  @changelog  0.0.6   Keeping the versions
 *  @changelo   0.0.7   New host
 *  @changelog  1.0.0   Trying to use always the same version
 *	@changelog	2.0.0	700px base-size + https
 *
 **/
(function (undefined)
{

    'use strict';
    
    
    
    // DEBUG?
    var DEBUG       =   false;
    
    // Versão
    var VERSION     =   '2.0.0';
    // ROOT PATH
    var ROOT_PATH   =   'https://especiais.zh.clicrbs.com.br/ferramentas/zh-iframes/css/';

    // Detect AMP Parameter on URL
    var is_AMP       =   /amp=true/.test(window.location.href);
    
    // Browser-Detection
    var is_iOS          =   !! navigator.userAgent.match(/iP(ad|hone|od)/i);
    var is_android      =   !! navigator.userAgent.match(/Android/i);   
    var is_windowsPhone =   !! navigator.userAgent.match(/Windows\s?Phone/i);
    var is_blackBerry   =   !! navigator.userAgent.match(/BlackBerry/i);
    var is_webkit       =   !! navigator.userAgent.match(/WebKit/i);
    var is_iOSSafari    =   ((is_iOS) && (is_webkit) && (! navigator.userAgent.match(/CriOS/i)));
    var isMobile        =   ((is_iOS) ||  (is_android)  ||  (is_windowsPhone)   ||  (is_blackBerry));
    
    
    // Timer para debounce de resize
    var TIMER   =   clearTimeout(TIMER);
    // Tempo para debounce (em ms)
    var DEBOUNCE_TIMER  =   100;
    // ID padrão do Wrapper
    var WRAPPER_ID      =   'gzh-iframe-wrapper';
    // MaxWidth
    var MAX_WIDTH       =   700;
	// Mínima largura do site
	var MIN_SITE_WIDTH	=	290;
    // Escala
    var SCALE           =   1.0;
    // Altura original
    var ORIGINAL        =   {};
    // Última altura
    var LAST_HEIGHT;
	//	Argumentos passados ao iframe
	var ARGS;
    
    // header da mensagem
    var MESSAGE_HEADER  =   'EnterScriptManMessage';
    // Checa se nunca se comunicou com a janela
    var neverSent       =   true;
    
    // Nome do Script
    var SCRIPT_NAME     =   'ResizeAndNotify-' + VERSION + '.js'
    ,   CSS_URL         =   ROOT_PATH   +   'EnterScriptMan-' + VERSION + '.css';
    
    // URL do ZH Noite
    var ZH_TABLET_URL   =   'https://flipzh.clicrbs.com.br/';
    
    
    
    // ID do iframe que encapsula essa página
    var ID;
    
    var PORTRAIT    =   0,
        LANDSCAPE   =   1;
    
    
    
    
    
    /**
     *
     *  Função gloabal que retorna a escala atual do Wrapper
     *
     *  @return float   Escala atual do Wrapper
     *
     **/
    if (! window.getWrapperScale) {
        
        window.getWrapperScale = function ()
        {
            
            return (SCALE || 1);
            
        };
        
    }





    /**
     *
     * Pollyfill para Array.forEach (IE)
     *
     **/
    if ( ! Array.prototype.forEach ) {
        
      Array.prototype.forEach = function(fn, scope) 
      {
        for (var i = 0, len = this.length; i < len; ++i) {
          fn.call(scope, this[i], i, this);
        }
      };
      
    }
    
    
    
    
    /**
     *
     *  Pollyfill Array.prototype.lastIndexOf
     *
     **/
    // Production steps of ECMA-262, Edition 5, 15.4.4.15
    // Reference: //es5.github.io/#x15.4.4.15
    if (!Array.prototype.lastIndexOf) 
	{
		
      Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) 
	  {
        'use strict';

        if (this === void 0 || this === null) {
          throw new TypeError();
        }

        var n, k,
          t = Object(this),
          len = t.length >>> 0;
        if (len === 0) {
          return -1;
        }

        n = len - 1;
        if (arguments.length > 1) {
          n = Number(arguments[1]);
          if (n != n) {
            n = 0;
          }
          else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
        }

        for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
          if (k in t && t[k] === searchElement) {
            return k;
          }
        }
        return -1;
      };
    }
    
    
    
    
    
    /**
     *
     *  addEventListener Pollyfill (IE)
     *
     **/
    //  addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
    (function (win, doc)
    {
        
        // No need to polyfill
        if (win.addEventListener) { 
            return;		
        };

        
        
        var docHijack = function (p)
        {
            var old = doc[p];
            
            doc[p] = function(v)
            {
                return (addListen(old(v)));
            };
        };
        
        
        
        var addEvent = function (on, fn, self)
        {
            return ((self = this).attachEvent('on' + on, function(e)
            {
                var e = e || win.event;
                
                e.preventDefault  = (e.preventDefault  || function()
                {
                    e.returnValue = false
                });
                
                e.stopPropagation = (e.stopPropagation || function()
                {
                    e.cancelBubble = true
                });
                
                fn.call(self, e);
            }));
        };
        
        
        
        var addListen = function (obj, i)
        {
            if (i = (((obj) && (obj.length)) ? (obj.length) : (0))) {
                while (i--) {
                    obj[i].addEventListener = addEvent;
                }
            } else { 
                if (obj) {
                    obj.addEventListener = addEvent;
                }
            }
            
            return (obj);
        };

        
        
        addListen([doc, win]);

        // IE8
        if ('Element' in win) {
            win.Element.prototype.addEventListener = addEvent;
        } else {																			
            //IE < 8
            //Make sure we also init at domReady
            doc.attachEvent('onreadystatechange', function ()
            {
                addListen(doc.all)
            });		
            docHijack('getElementsByTagName');
            docHijack('getElementById');
            docHijack('createElement');
            addListen(doc.all);	
        }
        
    })(window, document);
    
    
    
    
    
    /**
     *
     *  Fix para console.debug (IE IE IE)
     *  Console-polyfill. MIT license.
	 *  https://github.com/paulmillr/console-polyfill
     *  Make it safe to do console.log() always.
     *
     **/
    (function(global) 
	{
	
	  'use strict';
	  
	  
	  
	  global.console	= (global.console || {});
	  var con 			= global.console;
	  var prop, method;
	  var empty 		= {};
	  var dummy 		= function() 
	  {
	  };
	  
	  var properties 	= 'memory'.split(',');
	  
	  var methods 		= [
		'assert',
		'clear',
		'count',
		'debug',
		'dir',
		'dirxml',
		'error',
		'exception',
		'group',
		'groupCollapsed',
		'groupEnd',
		'info',
		'log',
		'markTimeline',
		'profile',
		'profiles',
		'profileEnd',
		'show',
		'table',
		'time',
		'timeEnd',
		'timeline',
		'timelineEnd',
		'timeStamp',
		'trace',
		'warn'
	  ];
		 
	  while (prop = properties.pop()) {
		if (! con[prop]) {
			con[prop] = empty;
		}
	  }
	  
	  while (method = methods.pop()) {
		if (! con[method])	{
			con[method] = dummy;
			
			if (method == 'debug') {
				con[method] = function (str)
				{
					console.log(str);
				};
			}
			
		}
	  }
	  
	})((typeof window === 'undefined') ? (this) : (window));
    
    
    
    
    
    var isIframe    =   function ()
    {
        
        try {
            return ((window.self) !== (window.top));
        } catch (e) {
            
            if (DEBUG) {
                console.debug('window.top Exception');
            }
            
            return (true);
        }
        
    };
    
    
    
    var getOrientation  =   function ()
    {
     
        var angle   =   0;

        if ((screen) && (screen.orientation) && (screen.orientation.angle)) {
            
            angle   =   parseInt(screen.orientation.angle / 90);
            
        } else if ((window) && (window.orientation)) {
            
            angle   =   parseInt(window.orientation / 90);
            
        } else {
        
            // console.debug(window.innerWidth + ' x ' + screen.availWidth + ' -> ' + window.devicePixelRatio);
            
            var windowWidth =   parseInt(window.innerWidth), 
                screenWidth =   parseInt(screen.availWidth);
                
            if (windowWidth != screenWidth) {
                windowWidth /=  window.devicePixelRatio;
            }
                
            // console.debug(window.innerWidth + ' x ' + screen.availWidth + ' -> ' + window.devicePixelRatio);
            
            if (windowWidth > screenWidth) {
                angle   =   1;
            } else {
                angle   =   0;
            }
        
        }
        
        
        
        switch (angle) {
        
        case(1):
        case(3):
        
            return (LANDSCAPE);
            
        default:
        
            return (PORTRAIT);
        
        }
        
    };
    
    
    
    var isIOS   =   function ()
    {
        
        try {
            
            var agent   =   window.navigator.userAgent;
            
            if ((-1 != agent.indexOf('iPhone')) || (-1 != agent.indexOf('iPad'))) {
                return (true);
            }
        
        } catch (e) {
            
             if (DEBUG) {
                console.debug('window.navigator Exception');
            }
            
            return (false);
            
        }
        
        return (false);
        
    };
    
    
    
    var reset   =   function ()
    {
        
        var wrapper             =   document.querySelector('#' + WRAPPER_ID);
      
        wrapper.style.height    =   'auto';
        
        var max_width       =   ((parseInt(wrapper.getAttribute('data-width'))) || (MAX_WIDTH)), 
            wrapperWidth    =   Math.min(Math.ceil(parseFloat(wrapper.scrollWidth)), max_width), 
            wrapperHeight   =   Math.ceil(parseFloat(wrapper.scrollHeight)), 
            transform       =   'matrix(1, 0, 0, 1, 0, 0)';
        
        // wrapper.style.width =   max_width;
        // ORIGINAL['width']   =   max_width;
        try {
            
            if (DEBUG) {
                console.debug('[' + ID + ']');
                console.debug('RESET FROM => (' + wrapperWidth + ', ' + wrapperHeight + ')');
            }
           
            // Transforma
            wrapper.style['transform']          =   transform;
            wrapper.style['-moz-transform']     =   transform;
            wrapper.style['-ms-transform']      =   transform;
            wrapper.style['-o-transform']       =   transform;
            wrapper.style['-webkit-transform']  =   transform;
           
            if (DEBUG) {
                console.debug('[' + ID + ']');
                console.debug('RESET TO => (' + wrapperWidth + ', ' + wrapperHeight + ')');
            }
           
            // Altera altura (pra não deixar espaço em branco após o transform)
            wrapper.style.width  =   (ORIGINAL['width']  + 'px');

        } catch (e) {
            console.debug('Reset Exception');
            // Sorria e acene
        }
        
    };
    
    
    

    
    /**
     *
     *  Função de resize
     *
     **/
    var resize  =   function ()
    {
        
		// console.debug(window);
		// console.debug('innrer-width -> ' + window.innerWidth);
		// console.debug('width -> ' + window.width);
		// console.debug('outer-width -> ' + window.outerWidth);
		var windowInner		=	((window.innerWidth) ? (window.innerWidth) : (Infinity))
		,	windowOutter	=	((window.outerWidth) ? (window.outerWidth) : (Infinity));
		
        var wrapper         =   document.querySelector('#' + WRAPPER_ID),
            rect            =   wrapper.getBoundingClientRect(), 
            max_width       =   ((parseInt(wrapper.getAttribute('data-width'))) || (MAX_WIDTH)), 
            windowWidth     =   parseFloat(Math.min(windowInner, windowOutter)), 
            // screenWidth     =   Math.floor(parseInt(screen.availWidth)), 
            // screenHeight    =   Math.floor(parseInt(screen.availHeight)), 
            wrapperWidth    =   Math.min(Math.ceil(parseFloat(wrapper.scrollWidth)), max_width), 
            wrapperHeight   =   Math.ceil(parseFloat(wrapper.scrollHeight));
		
        //	windowWidth =   ((isIOS()) ? ((getOrientation() == PORTRAIT) ? (screenWidth) : (screenHeight)) : (windowWidth));
        windowWidth =   Math.min(max_width, windowWidth);
        
        if (DEBUG) {
            console.debug('[' + ID + ']');
            console.debug ('window: ' + windowWidth + ' x wrapper: (' + wrapperWidth + ', ' + wrapperHeight + ')');
        }
        
        // Gambiarra graças aos paddings no site
        // console.debug('MEASURED: ' + windowWidth);
        
        var ratio   =   parseFloat(windowWidth / wrapperWidth);
            ratio   =   Math.min(1, ratio);
            ratio   =   ratio.toPrecision(3);
            
        var newWidth    =   Math.min(max_width, windowWidth);
        var delta       =   (parseInt((newWidth / 2)) * -1);  

		//console.debug(windowWidth);
        // console.debug(ratio);		
            
		// Se vamos aplicar ou não scale e translate no wrapper
        var transform;
		
		//	 Se o site for ainda menor do que o menor site (APP)
		if (newWidth < MIN_SITE_WIDTH) {
			ratio   	=   parseFloat(newWidth / MIN_SITE_WIDTH);
            ratio   	=   Math.min(1, ratio);
            ratio   	=   ratio.toPrecision(3)
			
			newWidth	=	MIN_SITE_WIDTH;
			transform   =   'matrix3d(' + ratio + ',0,0,0,0,' + ratio + ',0,0,0,0,1,0,' + delta + ',0,0,1)';
		} else {
			
			transform	=	'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + delta + ',0,0,1)'
			
		}
        
        // Colocando a escala na global
        SCALE   =   ratio;
        
        try {
           
           // Altera altura (pra não deixar espaço em branco após o transform)
           // wrapper.style.height   =   (Math.ceil(ratio * ORIGINAL.height) + 'px');
           
            // Transforma
            wrapper.style['min-width']  		=   ('initial');
            wrapper.style['max-width']  		=   (newWidth + 'px');
            wrapper.style.width        		 	=   ('100vw');
            wrapper.style.height        		=   'auto';
			wrapper.style.position				=	'absolute';
            
            wrapper.style['transform']          =   transform;
			wrapper.style['-webkit-transform']  =   transform;
            wrapper.style['-moz-transform']     =   transform;
            wrapper.style['-ms-transform']      =   transform;
            wrapper.style['-o-transform']       =   transform;

        } catch (e) {
            // Sorria e acene
        }
        
    };
    
    
    
    /**
     *
     * Função de notificação
     *
     **/
    var notify  =   function ()
    {
        
        var wrapper =   document.querySelector('#' + WRAPPER_ID), 
            height  =   Math.ceil(wrapper.offsetHeight);
            height  =   ((isNaN(height)) ? (1) : (height));

        if ((height != LAST_HEIGHT) || (neverSent)) {
            
            if (DEBUG) {
                console.debug('[' + ID + ']');
                console.debug('ESCALA -> ' + SCALE);
                console.debug('NOTIFICAREI QUE TENHO ' + height + ' pois antes tinha ' + ORIGINAL.height + ' (last: ' + LAST_HEIGHT + ')');
                console.debug(ORIGINAL);
            }
            
            LAST_HEIGHT         =   height;
            var RESIZE_MESSAGE  =   JSON.stringify({
                'EnterScriptManMessage': {
                    'height':   new String(height), 
                    'id':       new String(ID)
                }
            });

            if (is_AMP) {
                RESIZE_MESSAGE = {
                    sentinel: 'amp',
                    type: 'embed-size',
                    height: height
                };
            }
            
            if (DEBUG) {
                console.debug('[' + ID + ']');
                console.debug('RESIZE MESSAGE:');
                console.debug(RESIZE_MESSAGE);
            }
            
            window.parent.postMessage(RESIZE_MESSAGE, '*');
            neverSent   =   false;
        
        } else {
            if (DEBUG) {
                console.debug('[' + ID + ']');
                console.debug('SEM NOTIFICAR altura = ' + height + ' , anterior =  ' + LAST_HEIGHT);
            }
        }
            
    };
    
    
    
    /**
     *
     *  Captura as dimensões ds página
     *
     **/
    var getDimensions   =   function ()
    {
        
        // if (DEBUG) {
            // console.debug('Pegando os tamanhos');
        // }
        
		var wrapper	=	document.querySelector('#' + WRAPPER_ID);
		
        ORIGINAL    =   {
            'width':    Math.ceil(parseFloat(wrapper.scrollWidth)), 
            'height':   (((ORIGINAL) && (ORIGINAL.height)) ? (ORIGINAL.height) : (Math.ceil(parseFloat(wrapper.scrollHeight)) ))          
        };
        
        LAST_HEIGHT =   ORIGINAL.height;
        
        // if (DEBUG) {
            // console.debug(ORIGINAL);
        // }
        
    };
    
    
    
    /**
     *
     *  Função que efetivamente notifica o iframe do odcumento pai sobre o 
     *  tamanho atual do conteúdo embeddado
     *
     **/
    window.resizeAndNotify  =   function (event)
    {

        // if (DEBUG) {
            // console.debug(event);
        // }
        // window.removeEventListener('resize', resizeAndNotify);
     
        // Limpa e seta timeout (debounce)
        TIMER   =   clearTimeout(TIMER);
        TIMER   =   setTimeout(function ()
        {
        
            // Reseta o wrapper
            reset();
            // Faz o resize do conteúdo
            resize();
            // Notifica o documento pai
            notify();
            
            // window.addEventListener('resize', resizeAndNotify);
        
        }, DEBOUNCE_TIMER);
    
    };
    
    
    
    /**
     *
     *  Função que captura a ID do iframe que contêm essa página
     *
     **/
    var getID   =   function ()
    {
    
        // Pegamos a search e decodamos para podermos extrair a ID
        var search      =   decodeURIComponent(document.location.search), 
            inIframe    =   isIframe();
        
        // Se não há search, não há negócio
        if (((! search) || (! search.length)) && (inIframe)) {
             console.error('Resize and Notify - Search !!!');
            return (undefined);
        }
        
        // Eliminar um possível ? inicial
        search  =   ((search.charAt(0) == '?') ? (search.substring(1)) : (search));

        // Quebrando por '&'
        search  =   search.split('&');
        
        // Opa, sem argumentos
        if ((! search.length) && (inIframe)) {
            console.error('Resize and Notify - Arguments !!!');
            return (undefined);
        }
        
        // Aqui vamos listar os argumentos
        var args   =   {};
        search.forEach (function (argument, index)
        {
            
            // Quebrandp o argumento
            argument    =   argument.split('=');
            
            // Sem 2 partes não é válido
            if (argument.length > 2) {
                return;
            }
            
            // Senão vai pro objeto
            args[argument[0]]   =   argument[1];
            
        });
        
        // Sem argumento EI não temos ID, mas isso pode vir a ocorrer em desenvolvimento
        if (((! args['EI']) || (! args['EI'].length)) && (inIframe)) {
            console.error('Resize and Notify - ID !!!');
            //return (undefined);
        }
		
		if ((args['EW']) && (! isNaN(args['EW']))) {
			MAX_WIDTH	=	args['EW'];
		}
		
		// Globalizando
		ARGS	=	args;
        
        // Retornando o ID
        return (args['EI']);
        
    };
    
    
    
    
    
    var receiveMessage  =   function (event)
    {
        if (is_AMP) {
            return;
        }
        
        // document.location.reload ();
        // A mensagem em si
        var message =   event.data;
        
        // Evita pegar outras mensagens (a do FB ferra o JSOn.parse)
        // Evita pegar outras mensagens (a do FB ferra o JSOn.parse)
        if (-1 == message.indexOf(MESSAGE_HEADER)) {
            return;
        }
        
        // Vemos se é um tipo válido de mensagem
        // Vemos se é mesmo a mensagem de reset
        if ((   (-1 == message.indexOf('reset'))
            &&  (-1 == message.indexOf('visible'))
            &&  (-1 == message.indexOf('invisible'))
            )
        ||  (-1 == message.indexOf('id'))
        ) {
            return;
        }
        
        // Parseia (a mensagem é um JSON stringificado)
        try {
            message =   JSON.parse(message);
        } catch (e) {
            return;
        }
        
        //  Se não houver mensagem
        //  Se ela não for um objeto
        // IGNORAMOS
        if ((! message) || (typeof(message) != 'object')) 
        {
            return;
        }
        
        message =   message[MESSAGE_HEADER];
        
        //  Sim, essa mesma verificação de novo, pois descartamos o header agora
        if ((! message) || (typeof(message) != 'object')) 
        {
            return;
        }
        
        // Se a mensagem não for pra mim (meu ID)
        if ((! message['id'])       
        ||  (! message['id'].length)         
        ||  (message['id'].trim() != ID)) {
            
            return;
            
        }
        
        // Agora roteamos pro local certo
        if ((message['reset'])  &&  (message['reset'] == 'reset')) {
            resetMessage(message);
        } else if ((message['visible'])     &&  (message['visible']     == 'visible')) {
            visibleMessage(message, true);
        } else if ((message['invisible'])   &&  (message['invisible']   == 'invisible')) {
            visibleMessage(message, false);
        }
 
    };
    
    
    
    var visibleMessage  =   function (message, isVisible)
    {
        
        // Se a mensagem não estiver 100% certa, ignorar
        if (((! message)            || (typeof(message) != 'object'))   || 
            ((! message['visible']) && (! message['invisible']))        || 
            ((message['visible'] != 'visible') && (message['invisible'] != 'invisible'))    ||
            (! message['id'])       || (! message['id'].length)         || (message['id'].trim() != ID)) {
                
            console.error('Error: formato da mensagem de visibilidade');
            return;
            
        }
        
        // isVisible deve ser === true ou === false
        if ((isVisible !== true) && (isVisible !== false)) {
            console.error('ERROR: visibilidade inválida');
            return;
        }
        
        // Tipo do evento e objeto de evento
        var type =  ((isVisible === true) ?   ('ZH:visible')  :   ('ZH:invisible'))
        ,   event;
        
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
    
    
    
    var resetMessage    =   function (message)
    {
            
        // IGNORAMOS
        if (((! message)            || (typeof(message) != 'object'))   || 
            (! message['reset'])    || (message['reset'] != 'reset')    ||
            (! message['id'])       || (! message['id'].length)         || (message['id'].trim() != ID)) {
                
            return;
            
        }
        
        resizeAndNotify();
        
    };
    
    
    
    var standAloneSetup =   function ()
    {
        
        // Capturando o Wrapper
        var wrapper =   document.querySelector('#' + WRAPPER_ID), 
            html    =   document.documentElement;
        
        wrapper.style['overflow-y'] =   'auto'; 
        html.style['background']    =   'rgba(0, 0, 0, 0.5)';
        
    };
    
    
    
    var setup   =   function ()
    {
        
        // Viewport
        var meta 	= 	document.querySelectorAll('meta')
		,	html	=	document.querySelector('html')
        ,	viewport
        ,	wrapper;
		
		// Se temos argumentos
		if ((ARGS) 
		&& 	(Object.keys(ARGS).length)
		&&	(ARGS['EW'])
		&&	(! isNaN(parseInt(ARGS['EW'])))) {
			html.classList.add('width-' + ARGS['EW']);
			
			MAX_WIDTH	=	ARGS['EW'];
			
		} else {
			html.classList.add('width-' + MAX_WIDTH);
		}
		
        
        // Todos os atributos meta
        if (meta) {
            // Apenas o viewport
            for (var i in meta) {
            
                if (! isNaN(i)) {
                
                    var name = meta[i].name.toLowerCase();
                    
                    if (name == 'viewport') {
                        viewport    =   meta[i];
                    }
                
                }
            
            }
        }
        
        // IE8 estava complicando com document.head ... =/
         var head    =   document.querySelectorAll('head');
             head    =   head[0];
                
        // Viewport
        if (! viewport) {
            viewport            =   document.createElement('meta');
            viewport.name       =   'viewport';
            viewport.content    =   'width=device-width, initial-scale=1, user-scalable=yes';
            
            // Adiciona ao head
           
            head.appendChild(viewport);
        }
        
        // Vendo se há um CSS
        var links       =   document.querySelectorAll('link')
        ,   barIndex    =   CSS_URL.lastIndexOf('/')
        ,   cssName     =   CSS_URL.substring((barIndex >= 0) ? (barIndex) : (0))
        ,   hasCSS      =   false;
       
        for (var i in links) {
        
            if (isNaN(i)) {
                continue;
            }
            
            var link    =   links[i]
            ,   href    =   link.href;
            
            if (href.match(cssName)) {
                hasCSS  =   true;
            }
        
        }
        
        if (! hasCSS) {
            // Adicionando um CSS on-the-fly para sumir com as borda do Iframe no IE-10
            var css         =   document.createElement('link');
                css.type    =   'text/css';
                css.rel     =   'stylesheet';
                css.href    =   CSS_URL;
                    
            // Inserindo o CSS na página
            head.appendChild(css);   
            
        }
        
        // Agora sim pegamso o wrapper
        wrapper = document.querySelector('#' + WRAPPER_ID);
        
        // Se não tiver wrapper, colocar no body
        if (! wrapper) {
            document.body.id    =   WRAPPER_ID;
            wrapper             =   document.querySelector('body');
        }
        
        wrapper.setAttribute('data-width', (ARGS['EW'] || MAX_WIDTH));
		wrapper.setAttribute('data-id', 	ARGS['EI']);
        
        if (is_iOSSafari) {
            wrapper.className   +=  (' ' + 'is-safari');
            wrapper.className   =   wrapper.className.trim();
        }
            
        getDimensions();
        
        window.addEventListener('message', function (event)
        {
            receiveMessage(event);
        });
    
    };
	
	
	
	
	
	/**
	 *
	 *	Para pedir um resize programaticamente
	 *
	 **/
	if ((! window.ZHFireEvent) || (typeof(window.ZHFireEvent) !== 'function')) 
    {
    
        window.ZHFireEvent   =   function (type)
        {

            if ((! type) || (! type.length)) {
                type    =   'GZH:resize';
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
             
            window.ZHFireEvent('GZH:resize');;
             
         };
        
    }
    
    
    
    
    
    // Pegamso aqui o ID da página (dado pelo encapsulador)
    ID  =   getID();
    
    window.history.replaceState(null, null, '');
    
    // Setupar o iframe
    setup();
    
    // Listeners adicionados ao documento para notificar o novo tamanho
    document.addEventListener('DOMContentLoaded',   resizeAndNotify);
    document.addEventListener('loadend',            resizeAndNotify);
	document.addEventListener('load',            	resizeAndNotify);
	
    window.addEventListener('fullscreenchange',     resizeAndNotify);
    window.addEventListener('resize',               resizeAndNotify);
    window.addEventListener('orientationchange',    resizeAndNotify);
    window.addEventListener('pageshow',             resizeAndNotify);
	
	document.addEventListener('GZH:resize',			resizeAndNotify);
    
    if (! isIframe()) {

        standAloneSetup();
        
    }
	
	// setTimeout(resizeAndNotify, (Math.floor(Math.random() * 1111)	+	111));
      
})();
