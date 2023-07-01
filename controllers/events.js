const Evento=require('../models/Evento')

const getEventos= async (req,res)=>{
    const eventos= await Evento.find()
                               .populate('user','name');
    res.json({
        ok:true,
        eventos
    })
}

const crearEventos=async (req,res)=>{
    
    const evento= new Evento( req.body);

    try {
        evento.user=req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el admin'
        });
    }
   
}

const actualizarEventos= async(req,res)=>{
    const eventoId=req.params.id;
    const uid=req.uid;

    try {
        const evento= await Evento.findById( eventoId);

       if(!evento){
       return  res.status(404).json({
            ok:false,
            msg:'Evento no existe con ese id'
        });
       }

       if( evento.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg:"No tienes permiso para editar este evento"
        });
       }

     const nuevoEvento={
        ...req.body,
        user:uid
     }

     const eventoActualizado= await Evento.findByIdAndUpdate(eventoId,nuevoEvento)

     res.json({
        ok:true,
        evento:eventoActualizado
     })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error en el catch'
        })
    }

}

const eliminarEventos= async (req,res)=>{
    const eventoId=req.params.id;
    const uid=req.uid;

    try {
        const evento= await Evento.findById( eventoId);

       if(!evento){
       return  res.status(404).json({
            ok:false,
            msg:'Evento no existe con ese id'
        });
       }

       if( evento.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg:"No tienes permiso para editar este evento"
        });
       }

    
    await Evento.findByIdAndDelete(eventoId);

  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error en el catch'
        })
    }

}

module.exports={
    getEventos,
     crearEventos,   
      actualizarEventos,
    eliminarEventos,
   
    

}